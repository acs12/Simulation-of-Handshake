# handshake-sjsu

Handshake-Redux-Dummy is the simulation of the website named Handshake. All the services offered by the Handshake for student and company is acieved in thie project.

## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) and Kafka installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
Kafka installation can be done from this website[https://kafka.apache.org/documentation/]

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React.

Travser to Kafka-Backend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
node server.js
```
It will start our Kafka-Backend server which is in NodeJS.
Everything is set and you are good to go.

## Running the tests

To run test for this system.
Traverse to test folder in Backend and enter
```
npm test
```
This will run the tests defined in the file.
You can add new Tests by adding test cases in this file.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance.
## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [Redux](https://redux.js.org/introduction/getting-started) - The open source library used
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [MongoDB](https://docs.mongodb.com/) - Database used

## Authors

* **Aayush Sukhadia**
