const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

const createAccountUseCase = require('./use-cases/create-account')();

require('./interface-adapters/controllers/account-controller')({ server, createAccount: createAccountUseCase }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});