//import sequelize so we can use ORM to write SQL to our database
const sequelize = require('../config/connection');
//import user and blog models from 'models' module
const { User, Blog} = require('../models');
//import JSON seed user data file
const userData = require('./userData.json');
//import JSON seed blog data file
 const blogData = require('./blogData.json');

 //function to seed the example users into the database
const seedUser = async () => {
  //syncs the Sequelize models with the database
  //force:true means that when the models and datbase are synchronized, all tables wll be dropped and recreated, resting the DB schema
 // await sequelize.sync({ force: true });
//bulkCreate puts multiple items into the User table at once, userData is an array of data getting inserted into the dtabase
//individual hooks: true means if the model uses hooks they will be executed on each instance of the model, return data inserted
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //exit node.js process, success status code is (0)
  process.exit(0);
};

//call the function to seed users
seedUser();

//function to seed the example blogs into the database
const seedBlog = async () => {
//creates multiple instances of Blog model as outlined in blogData seeds file
  await Blog.bulkCreate(blogData);
  //exit node.js process, success status code is (0)
  process.exit(0);
};

//calls seedBlog function
seedBlog();