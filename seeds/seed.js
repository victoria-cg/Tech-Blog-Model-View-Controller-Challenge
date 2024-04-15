//import sequelize so we can use ORM to write SQL to our database
const sequelize = require('../config/connection');
//import user and blog models from 'models' module
const { User, Blog} = require('../models');
//import JSON seed user data file
const userData = require('./userData.json');
//import JSON seed blog data file
 const blogData = require('./blogData.json');

 //function to seed the example users into the database
const seedDatabase = async () => {
  //syncs the Sequelize models with the database
  //force:true means that when the models and datbase are synchronized, all tables wll be dropped and recreated, reseting the DB schema
 await sequelize.sync({ force: true });
//bulkCreate puts multiple items into the User table at once, userData is an array of data getting inserted into the dtabase
//individual hooks: true means if the model uses hooks they will be executed on each instance of the model, return data inserted
//seed the users first to not violate the foreign key constraints of the blog model that uses the user id as a foreign key, then seed the blogs
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //creates multiple instances of Blog model as outlined in blogData seeds file
  await Blog.bulkCreate(blogData);

  //exit node.js process, success status code is (0)
  process.exit(0);
};

//call the function to seed the database
seedDatabase();