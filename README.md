# Project 2: Happy Trees 🌳
  ![github license](http://img.shields.io/badge/license-MIT-green.svg)

  ## Link
  https://gentle-lake-59989.herokuapp.com/


  ## Description
  This application is designed to query through planted plant data parameters to make an informed decision on what to plant at a new site as well as upload newly planted plant data 
  
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [Screenshots](#screenshots)

  ## Installation
  To run locally, add `.env` file with the following content:
  
  ```
  SEQUELIZE_USER=<your_mysql_db_user>
  SEQUELIZE_PASSWORD=<your_mysql_db_password>
  SEQUELIZE_HOST=localhost
  SEQUELIZE_DB=happytrees
  AUTH_SECRET=<your_auth_secret_key>
  ADMIN_USER_PWD=admin_password
  USER_PWD=user_pwd
  FORCE_SYNC=true
  TU=mysql_user
  TP=mysql_password
  ```
  
  Run the following commands at root of the project:
  
  `npm init -y`<br/>
  <br/>
  `npm install`<br/>
  <br/>
  `node server.js`
  
  ## Usage
  Live deployment: Access [link](#link)<br/>
  <br/>
  Local deployment: Download code and follow [installation](#installation)
  
  ## License
  ![github license](http://img.shields.io/badge/license-MIT-green.svg)

  This project is covered under the MIT license
  
  ## Contributing
  [Jordan H.](https://github.com/JHESSLER11): Back-end routing / CSV File Reader/Uploader Development<br/>
  [Blair S.](https://github.com/dogmom3): UI Design / HTML/Handlebars and CSS Styling<br/>
  [Abi P.](https://github.com/Apjuve): Front-end JavaScript / Site Routing<br/>
  [Adam P.](https://github.com/agpritts): SQL / Git conflict resolution / Debugging<br/>
  [Mark H.](https://github.com/utilrr): Google Maps API / Scrum Master<br/>
  
  ## Tests
  N/A<br/>
  
  ## Questions
  Contact with any questions:<br/>
  <br/>
  :octocat: [GitHub](https://github.com/HackStreetPeople)<br/>
  <br/>
  
  ## Screenshots
  Homepage:<br/>
  <br/>
  <img width="1544" alt="Screen Shot 2022-04-17 at 8 05 40 PM" src="https://user-images.githubusercontent.com/96213926/163737211-90ecbc9c-1ef2-4564-83ca-6a41204fff0f.png">
  <br/>
  <br/>
  Viewing tree data:<br/>
  <br/>
  <img width="1543" alt="Screen Shot 2022-04-17 at 8 06 15 PM" src="https://user-images.githubusercontent.com/96213926/163737215-dda3b980-77b9-4d95-a16f-2c8edc7cf392.png">
  <br/>
  <br/>
  User registration:<br/>
  <br/>
  <img width="1545" alt="Screen Shot 2022-04-17 at 8 06 40 PM" src="https://user-images.githubusercontent.com/96213926/163737221-f83cd232-90aa-4a29-982b-2aa4380e9e69.png">