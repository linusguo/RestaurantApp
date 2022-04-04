
const { getDb, getNextSequence } = require('./db.js');

const menuDB = [
  {
    id: 1, name: "Pizza", category: "Entree", quantity: 1,
    price: 10, image_link: "helloWorld.jpg", description: "A simple pizza.",
  },
  {
    id: 2, name: "Burger", category: "Entree", quantity: 1,
    price: 18, image_link: "hello.jpg", description: "A hearty burger.",
  }
];

const shoppingBag = [
  {
    id: 1, name: "Pizza", category: "Entree", quantity: 1,
    price: 10, image_link: "helloWorld.jpg", description: "A simple pizza."
  }
];

const orderDB = [
    { id: 1, date: "04/12/2013", price: 123.3, delivery: true,
      address: "Northeastern University, Seattle, WA",
      contact_name: "Yusheng Guo", phone: "1234567834",
      card_number: "1234-5623-4567-6463",
      account : "account1",
      dishes: [
        {
          id: 1, name: "Pizza", category: "Entree", quantity: 1,
          price: 10, image_link: "helloWorld.jpg", description: "A simple pizza."
        },
      ]
    },

    { id: 2, date: "23/02/2020", price: 1.23, delivery: false,
      address: "Hello World, Seattle, WA",
      contact_name: "Linus", phone: "0009991234",
      card_number: "1234-5623-4567-6463",
      account : "account2",
      dishes: [
        {
          id: 1, name: "Pizza", category: "Entree", quantity: 1,
          price: 10, image_link: "helloWorld.jpg", description: "A simple pizza."
        },
        {
          id: 2, name: "Burger", category: "Entree", quantity: 1,
          price: 18, image_link: "hello.jpg", description: "A hearty burger."
        }
      ]
    },
  ];

const userDB =
  {
    email: "linusguo@gmail.com",
    address: "Northeastern University, Seattle, WA",
    phone: "1234567890",
    name: "Linus Guo",
    cards: [
      { id: 1, card_number: "1234-5678-2345-7890", expiration: "03/26" },
      { id: 2, card_number: "1234-5623-4567-6463", expiration: "07/26" }
    ],
    orderNumbers: [1, 2],
  }

async function menu() {
  const db = getDb();
  const dishes = db.collection('menu').find({}).toArray();
  // console.log("Menu"  + dishes);
  return dishes;
}

function bag() {
  return shoppingBag;
}

function user() {
  return userDB;
}

async function orderById(_, { id }) {
  const db = getDb();
  const orders = await db.collection('orders').find({}).toArray();
  for (var i = 0; i < orders.length; i ++) {
    if(orders[i].id === id) {
      return orders[i];
    }
  }
}

async function ordersByEmail(_, { email }) {
  const db = getDb();
  const orders = await db.collection('orders').find({}).toArray();
  let filteredOrders = []
  // console.log("email:" + email);
  const emailAdress = email;
  for (var i = 0; i < orders.length; i ++) {
    if(orders[i].email === email) {
      filteredOrders.push(orders[i])
    }
  }

  return filteredOrders
}

async function orderNumbers() {
  const db = getDb();
  const orders = await db.collection('orders').find({}).toArray();
  return orders.length;
}

function dishAdd(_, { dish }) {
  let found = false
  for (var i=0;i<shoppingBag.length;i++) {
    if(dish.name == shoppingBag[i].name) {
      dish.id = i;
      shoppingBag[i].quantity += 1;
      found = true
    }
  }
  if (found == false) {
    dish.id = shoppingBag.length;
    shoppingBag.push(dish);
  }
  return dish;
}

function dishMinus(_, { dish }) {
  let found = false
  for (var i = 0; i < shoppingBag.length; i++) {
    if (dish.name == shoppingBag[i].name) {
      found = true;
      if (shoppingBag[i].quantity >= 1) {
        shoppingBag[i].quantity -= 1;

        if (shoppingBag[i].quantity === 0) {
          shoppingBag.splice(i, 1);
        }
      }
    }
  }
  dish.id = -1;

  return dish;
}

async function orderAdd(_, {SubOrder}) {
  const db = getDb();
  const newOrder = Object.assign({}, SubOrder);
  newOrder.created_time = new Date();
  newOrder.id = await getNextSequence('orders');

  const result = await db.collection('orders').insertOne(newOrder);
  const savedOrder = await db.collection('orders')
    .findOne({ _id: result.insertedId });
  return savedOrder
}

module.exports = { menu, bag, user, orderById, dishAdd, dishMinus, orderAdd, ordersByEmail, orderNumbers }
