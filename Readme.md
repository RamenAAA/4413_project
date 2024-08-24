# Overview
Welcome to MARK Clothing E-Commerce Store. This project is an e-commerce website that is created using React, Node.JS, MySQL database, and it is deployed on Docker. 

The official GitHub link for the project is [Github link](https://github.com/RamenAAA/4413_project).

The instructions on how to run the project on the docker and local machine are as follows.

# Installation
## Docker
1. Download the project zip and extract the project to the desired location.
2. Open Terminal and navigate to the project location.
3. Run Docker desktop.
4. In the terminal, run `docker-compose up --build`.
5. Once the deployment is over, open the Docker desktop and click on the link under Ports section.
6. The link will open the website page on the default browser.

## Local Machine
1. Follow steps 1-3 from Docker installation instructions.
2. Download MySQL and MySQL Workbench on the local machine and finish its setup. 
3. Create a new local instance of MySQL. Note down the username and password (by default, it will be the root credentials).
4. Start the MySQL service.
5. In MySQL Workbench, create a new database named `ecommerce`.
6. Open File -> Open SQL Script, navigate to the project location, and select `schema.sql`.
7. The SQL file will open in the editor. Select the SQL code and run it to setup the database.
8. Back to the terminal, navigate to `backend` folder and run `npm install` to install the necessary libraries. Make sure that Node.JS v20.15.1 is installed (it includes NPM).
9. Then, run `npm start` to run the server.
9. In terminal, navigate back to the project directory, and then open `frontend -> 4413_project`.
10. Run `npm install` to install the libraries and then, run `npm run build` to build the frontend.
11. Once the build is complete, run `npm run preview` and copy the link associated with 'Local' in the terminal output. Paste the link in the browser to start the website.

