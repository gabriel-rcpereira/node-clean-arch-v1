const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

const { v4: uuid } = require('uuid');

const account = require('./domains/account')({ uuid });

const accountGateway = require('./interface-adapters/out/db/account-repository')();

const createAccount = require('./use-cases/create-account')({ accountGateway, account });

require('./interface-adapters/in/rest/account-controller')({ server, createAccount }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});