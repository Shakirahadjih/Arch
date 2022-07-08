# Architecture
Architecture for the minor Blockchain

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#Documentation">Documentation</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
The use case that is chosen is tracking supply and origin.
Motivations: checking sources; more transparency in the product. 

For this project we tried to make a proof-of-concept for the use case that is written above. 
This project aims at presenting an implementation of a permissioned blockchain network using Hyperledger Fabric version 2.4


### Built With

This application is built with/ using:
* javascript
* Docker
* Postman

<!-- GETTING STARTED -->
## Getting Started

You must have the Hyperledger Development Environment configured in your machine or a spare VM. If you do not have it yet, you can follow the instructions:

* Prerequisites (installation of cURL, Docker and Docker Composer, GO, NodeJS(v12.22), Python, Git): [link](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)
    * For NodeJS/NPM I would recommend using the **nvm** tool to manage the variety of versions automatically
* Install Samples, Binaries, and Docker Images: [link](https://hyperledger-fabric.readthedocs.io/en/latest/install.html)

Alternatively, you can use a ready-to-use Linux Virtual Machine running on VirtualBox. More information can be found [here](./VM.md)

Follow these simple steps to install this project locally.
### Prerequisites

First off, we need to install npm & git to your computer to run my application.

1. Install NPM packages
  ```
    npm install
  ```

2. Install git
  ```
    install git
  ```

### Installation

3. Clone the repo
   ```
   git clone 
   ```

4. Start up the network

Go to 'fabric-samples/test-network' folder, normally installed in the home folder of your file system

Execute the following command to create and start the blockchain network:

   ```
   ./network.sh up createChannel -ca -s couchdb 
   ```

5. Deploying the chaincode

After you have used the network.sh startup command, you can deploy the chaincode on the channel using the following commands (from 'fabric-samples/test-network'):

   ```
   ./network.sh deployCC -ccn inventory -ccp [base-folder]/Architecture/chaincode -ccv 1 -ccs 1 -ccl javascript
   ```

6. Installing client dependencies 

First, you should install the dependencies.

Using the terminal window, execute the following command in the **client/backend** folder:

```
npm --logevel=error install
```

This command will install all dependencies in the *node_modules* folder.

7. Setting up HLF network configuration

Our client programs are using the test-network connection profile to connect to the network. All programs are using the FABRIC_PATH variable. Thus, by using your terminal, you should create the variable FABRIC_PATH pointing to the folder of your fabric-samples, for example:

```
export FABRIC_PATH=~/fabric-samples
```

8. Adding the first user to the wallet

The administrator of an organisation can issue certificates to new users. You will need that to create the participants of the egg tracking network such as farmers, distributors and shippers. Thus, you should export the admin certificate to the **client/backend/wallet** folder. To do so, execute the following operation:

```
node src/enrollAdmin.js
```

9. Get the application running

To start the server use the following command:

  `npm start` 

It will start a server running on port 8080.

## Postman

Packing Eggs

POST http://localhost:8080/rest/eggboxes
{
   "farmerId":"eggtrackingf1@gmail.com",
   "packingTimestamp":"20191224151230",
   "quantity":"30"
}
```
```
Creating a Transfer Request

POST http://localhost:8080/rest/shipments
{
   "farmerId":"eggtrackingf1@gmail.com",
   "shipperId":"eggtrackings1@gmail.com",
   "distributorId":"eggtrackingd1@gmail.com",
   "shipmentCreation":"20191124154531",
   "min":"1",
   "max":"30"
}
```


<!-- ROADMAP -->
## Documentation

Click [here](https://docs.google.com/document/d/1nIwbUUgP0w1LBSgV8HKBDSg2sevmRwAeZLNa16wk-5s/edit) for the documentation of this project.
