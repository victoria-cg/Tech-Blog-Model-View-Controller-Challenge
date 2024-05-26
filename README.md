# Tech-Blog-Model-View-Controller-Challenge

## Description

This tech blog challenge allowed me to practice with model-view-controller file structure, including the use of handlebars.js, the sequelize Node package, and a MySQL database. THe concept of the project is to create a tech blog where programmers can share their thoughts about what they are learning.


## Installation

The application is deployed to Heroku and does not require installation, to use the login route with existing seeded users, uset the following test user credentials: "email": "victoria@gmail.com",
        "password": "password12345"

## Usage

Click the nav links to login and navigate between pages. CLick the login button to login.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    
![screensot of blog](/public/assets/images/mvc-challenge-screenshot.png)


## Credits

Tutoring with BCS Bootcamp tutor Alexis Gonzalez: 

Assistance with the following concepts:
setup api home routes index, user routes. Understanding of homeroutes vs userRoutes
Main, homepage, profile, and signup handlebars layouts
Helped setup user model
Fixed use of db name rather than environment variable in schema.sql
Use of middleware to track homeroutes being hit/accessed
Helped with use of sessions, understanding auth
Understanding where to add handlebars ‘for each’ loops to render all blog data on the home page

Xpert  AI:
-Debugging data relationships in model index.js file
-syntax debugging for making seed functions all one function instead of 2

AskBCS Learning Assistant:
-debugging seed file function to seed database


## License

This project uses an MIT license. For more information see the license section of the repository or visit https://choosealicense.com/licenses/mit/.
