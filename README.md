![gif-wallet](https://user-images.githubusercontent.com/120587680/236262414-05507cf1-e24c-48d0-af6f-c20fe00b3106.gif)

# Introduction
This project is a Mobile web application for money management.

The application has a login screen and a user registration screen, where new users can register. After login, the user is redirected to the main screen, where they can add new transactions and view the transactions already registered.

The project is divided into two repositories: this one one for the front-end and one for the back-end. The front-end was developed using HTML, CSS, JS, and React, while the back-end was developed using Node.js and Express using a noSQL database (MongoDB).

## Deploy
You can test the app here: https://mywallet-self.vercel.app/
obs: As a free hosting service is being used, the initial request may take a few seconds to load. However, once the server is up and running, the response time should improve significantly.

## Installation
To run the project on your local machine, you need to have Node.js installed. Clone the front-end and back-end repositories and follow the instructions below:

### Front-end
Clone the front-end repository.
Access the front-end directory through the terminal.
Install the project dependencies using the command npm install.
Run the command npm start to start the server.

### Back-end
clone the back-end repository.
Access the back-end directory through the terminal.
Install the project dependencies using the command npm install.
config the .env file.
Edit the .env file with the necessary information, such as database access credentials and the PORT used.
Run the command npm start to start the server.

## Features
The project has the following features:

## User Registration
The user can register on the application through the /cadastro route. It is necessary to fill in all the mandatory fields and confirm the password. The password will be encrypted before being stored in the database.

## Login
The user can log in to the application through the / route. It is necessary to correctly fill in the email and password to access the main screen.

## Add Transactions
The user can add a new transaction to the main screen of the application. It is necessary to fill in all the mandatory fields and select the transaction completion date. The transaction will be saved in the database and displayed in the transaction list.

## List Transactions
On the main screen of the application, the user can view the list of registered transactions. The transactions are displayed in chronological order, from the most recent to the oldest. It is possible to edit or delete a transaction by clicking on the corresponding buttons.

## Edit Transactions
When clicking on the edit transaction button, the user is redirected to the transaction editing screen. It is possible to edit all the fields of the transaction. The changes will be saved in the database and reflected in the transaction list.

## Delete Transactions
When clicking on the delete transaction button, the transaction will be removed from the database and will no longer be displayed in the transaction list.
