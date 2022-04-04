
const Router = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const cors = require('cors');
const { getDb, getNextSequence } = require('./db.js');

let { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  if (process.env.NODE_ENV !== 'production') {
    JWT_SECRET = 'tempjwtsecretfordevonly';
    console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
  } else {
    console.log('Missing env var JWT_SECRET. Authentication disabled');
  }
}

const routes = new Router();

routes.use(bodyParser.json());

const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
routes.use(cors({ origin, credentials: true }));

function getUser(req) {
  const token = req.cookies.jwt;
  if (!token) return { signedIn: false };

  try {
    const credentials = jwt.verify(token, JWT_SECRET);
    return credentials;
  } catch (error) {
    return { signedIn: false };
  }
}

routes.post('/signin', async (req, res) => {
  if (!JWT_SECRET) {
    res.status(500).send('Missing JWT_SECRET. Refusing to autenticate');
  }
  const googleToken = req.body.google_token;
  if (!googleToken) {
    res.status(400).send({ code: 400, message: 'Missing Token' });
    return;
  }

  const client = new OAuth2Client();
  let payload;
  try {
    const ticket = await client.verifyIdToken({ idToken: googleToken });
    payload = ticket.getPayload();
  } catch (error) {
    res.status(403).send('Invalid credentials');
  }

  const { given_name: givenName, name: name, email: email } = payload;
  const credentials = {
    signedIn: true, givenName, name, email,
  };

  const user = await findUserByEmail(credentials.email);
  let currentUser = user;
  if (user == null) {
    currentUser = await addUser(credentials);
    JSON.stringify()
  }

  credentials.phone = currentUser.phone;
  credentials.orderNumbers = currentUser.orderNumbers;

  const token = jwt.sign(credentials, JWT_SECRET);
  res.cookie('jwt', token, {
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
  });

  res.json(credentials);
});

async function findUserByEmail(emailAdress) {
  const db = getDb();
  const user = await db.collection('users').findOne({ email: emailAdress});
  return user;
}

async function addUser(user) {
  const db = getDb();
  const newUser = Object.assign({}, user);
  newUser.id = await getNextSequence('users');
  newUser.phone = "";
  newUser.address = "Northeastern University, Seattle, WA";
  newUser.orderNumbers = [];

  delete newUser ['signedIn'];
  const result = await db.collection('users').insertOne(newUser);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId });
  return savedUser;
}

routes.post('/signout', async (req, res) => {
  res.clearCookie('jwt');
  res.json({ status: 'ok' });
});

routes.post('/user', (req, res) => {
  res.send(getUser(req));
});

function mustBeSignedIn(resolver) {
  return (root, args, { user }) => {
    if (!user || !user.signedIn) {
      throw new AuthenticationError('You must be signed in');
    }
    return resolver(root, args, { user });
  };
}

function resolveUser(_, args, { user }) {
  return user;
}

module.exports = {
  routes, getUser, mustBeSignedIn, resolveUser, addUser,
};
