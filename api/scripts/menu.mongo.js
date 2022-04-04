/*
* Run using the mongo shell. For remote databases, ensure that the
* connection string is supplied in the command line. For example:
* localhost:
*   mongo issuetracker scripts/init.mongo.js
* Atlas:
*   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker
*   scripts/init.mongo.js
* MLab:
*   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker  scripts/init.mongo.js
*/

/* global db print */
/* eslint no-restricted-globals: "off" */

db.menu.remove({});
// db.deleted_issues.remove({});

const menuDB = [
  {
    id: 1, name: "Pizza", category: "Entree", quantity: 0,
    price: 10, image_link: "helloWorld.jpg", description: "A simple pizza."
  },
  {
    id: 2, name: "Burger", category: "Entree", quantity: 0,
    price: 18, image_link: "hello.jpg", description: "A hearty burger."
  },
  {
    id: 3, name: "Fries", category: "Appetizer", quantity: 0,
    price: 6, image_link: "hello.jpg", description: "Yummy fries."
  },
  {
    id: 4, name: "Coke", category: "Drink", quantity: 0,
    price: 3, image_link: "hello.jpg", description: "Nobody can refuse."
  },
];

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
    description: 'Steps to recreate the problem:'
    + '\n1. Refresh the Browser.'
    + '\n2. Select "New" in the filter.'
    + '\n3. Reefresh the browser again. note the warning in the console:.'
    + '\n    Warning: Hash history cannot PUSH the same paht; a new entry'
    + '\n    will not be added to the history stack'
    + '\n4. Click on Add.'
    + '\n5. There is an error in the consolle, and doesn\'t work.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
    description: 'There needs to be a border in the bottom of the panel'
    + 'that appears when clicking on Add.',
  },
];

db.menu.insertMany(menuDB);
const count = db.menu.count();
print('Inserted', count, 'dishes');

db.menu.createIndex({ id: 1 }, { unique: true });
db.menu.createIndex({ status: 1 });
db.menu.createIndex({ owner: 1 });
db.menu.createIndex({ created: 1 });
db.menu.createIndex({ title: 'text', description: 'text' });
db.counters.remove({ _id: 'menu' });
db.counters.insert({ _id: 'menu', current: count });

const subDishs = [{
  name : "Burger",
  quantity : 10,
  price : 100,
  category : "Entree"
}]

const subDish = JSON.stringify(subDishs);

db.orders.remove({});
const orderDB = [
  {
    id: 1,
    created_time: new Date(),
    dishes: subDish,
    email : "ziruiwang1997@gmail.com",
    name : "zirui1",
    method : "Pick Up"
  },
  {
    id: 2,
    created_time: new Date(),
    dishes: subDish,
    email : "ziruiwang1997@gmail.com",
    name : "zirui2",
    method : "Deliever"
  },
  {
    id: 3,
    created_time: new Date(),
    dishes: subDish,
    email : "ziruiwang1998@gmail.com",
    name : "zirui3",
    method : "Deliever"
  },
]
db.orders.insertMany(orderDB);
const count2 = db.orders.count();
print('Inserted', count2, 'orders');
db.counters.remove({ _id: 'orders' });
db.counters.insert({ _id: 'orders', current: count });

// Users
db.users.remove({});
const userDB = [
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
  },
  {
    email: "supermansnake33@gmail.com",
    address: "Northeastern University, Seattle, WA",
    phone: "1234567890",
    name: "SHAN HUANG",
    cards: [
      { id: 1, card_number: "1234-5678-2345-7890", expiration: "03/26" },
      { id: 2, card_number: "1234-5623-4567-6463", expiration: "07/26" }
    ],
    orderNumbers: [1, 2],
  },
]

db.users.insertMany(userDB);
const count1 = db.users.count();
print('Inserted', count1, 'users');

db.counters.remove({ _id: 'users' });
db.counters.insert({ _id: 'users', current: count1 });
