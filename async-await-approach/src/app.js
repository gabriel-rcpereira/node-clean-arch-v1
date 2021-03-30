const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

// const account = require('./domains/account')();
const account = require('./domains/account-async')();

const { AccountEntity } = require('./infrastructure/db/mongo-db')();

const accountGateway = require('./interface-adapters/out/db/account-repository')({ AccountEntity });

const validateOperationType = require('./use-cases/validate-operation-type')();
// const createAccount = require('./use-cases/create-account')({ accountGateway, account });
// const doOperation = require('./use-cases/do-operation')({ accountGateway, accountDomain: account, validateOperationType });
const createAccount = require('./use-cases/create-account-async')({ accountGateway, account });
const doOperation = require('./use-cases/do-operation-async')({ accountGateway, accountDomain: account, validateOperationType });

const { validateOperationTypeMiddleware } = require('./interface-adapters/in/rest/middlewares/operation-type-validator')({ validateOperationType });

// require('./interface-adapters/in/rest/account-controller')({ server, createAccount, doOperation, validateOperationTypeMiddleware }).map();
require('./interface-adapters/in/rest/account-controller-async')({ server, createAccount, doOperation, validateOperationTypeMiddleware }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});