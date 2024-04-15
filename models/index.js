const User = require('./User');
const Blog = require('./Blog')

//establish database relationships: see bootcamp module 13 on ORM for more examples/explanation
//blog has one user, if user is deleted this cascades to their blogs and deletes them too, user id is foreign key referencing id column in user table
Blog.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  Blog.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  // Define a user as having many blogs, creates a foreign key in the `blog` table
  User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  

module.exports = { User, Blog };
