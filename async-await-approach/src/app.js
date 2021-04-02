const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

const axios = require('axios').default;

const accountDomain = require('./domains/account')();

const { AccountEntity } = require('./infrastructure/db/mongo-db')();

const accountGateway = require('./interface-adapters/out/db/account-repository')({ AccountEntity });
const accountFileGateway = require('./interface-adapters/out/rest/account-file-gateway')({ restClient: axios });

const validateOperationType = require('./use-cases/validate-operation-type')();
const createAccount = require('./use-cases/create-account')({ accountGateway, accountDomain });
const doOperation = require('./use-cases/do-operation')({ accountGateway, accountDomain, validateOperationType });

const { validateOperationTypeMiddleware } = require('./interface-adapters/in/rest/middlewares/operation-type-validator')({ validateOperationType });

require('./interface-adapters/in/rest/account-controller')({ server, createAccount, doOperation, validateOperationTypeMiddleware }).map();
require('./interface-adapters/in/rest/pdf-controller')({ server, accountFileGateway }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});