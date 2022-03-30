const mongoose = require('mongoose');
const config = require("./config");
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [cpu, hdd, gpu] = await Category.create({
    title: 'CPUs',
    description: 'Central Processing Units'
  }, {
    title: 'HDDs',
    description: 'Hard disk drives'
  }, {
    title: 'GPUs',
    description: 'Graphic Processing Units'
  });

  await Product.create({
    category: cpu,
    title: 'Intel Core i7 10700 KF',
    price: 500,
    description: '8 Cores / 16 Threads, Socket Type LGA 1200, Up to 5.1 GHz Unlocked',
    image: 'cpu.jpg'
  }, {
    category: hdd,
    title: 'Seagate BarraCuda 4TB',
    price: 90,
    description: 'Store more, compute faster, and do it confidently with the proven reliability of BarraCuda internal hard drives',
    image: 'hdd.jpg'
  }, {
    category: gpu,
    title: 'Gigabyte Nvidia GeForce RTX 3070 Vision OC',
    price: 1000,
    description: 'Powerful GeForce RTX™ 30 VISION series accelerates your work with incredible boosts in performance',
    image: 'gpu.jpg'
  });

  await User.create({
    email: 'user@user',
    password: '123',
    token: nanoid(),
    role: 'user',
  },{
    email: 'admin@admin',
    password: '123',
    token: nanoid(),
    role: 'admin',
  },);

  await mongoose.connection.close();
};

run().catch(e => console.error(e));