const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

const account = require('./domains/account')();

const { AccountEntity } = require('./infrastructure/db/mongo-db')();

const accountGateway = require('./interface-adapters/out/db/account-repository')({ AccountEntity });

const createAccount = require('./use-cases/create-account')({ accountGateway, account });
const doOperation = require('./use-cases/do-operation')({ accountGateway, account });

require('./interface-adapters/in/rest/account-controller')({ server, createAccount, doOperation }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});