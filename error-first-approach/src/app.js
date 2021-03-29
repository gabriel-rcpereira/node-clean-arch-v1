const express = require('express');
const server = express();
const port = 3001;

server.use(express.json());

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/bank-account', {useNewUrlParser: true, useUnifiedTopology: true});

// const { Schema } = mongoose;
// mongoose.model('account', new Schema({ balance: Number }));

const account = require('./domains/account')();

const { AccountEntity } = require('./infrastructure/db/mongo-db')();
const accountGateway = require('./interface-adapters/out/db/account-repository')({ AccountEntity });

const createAccount = require('./use-cases/create-account')({ accountGateway, account });

require('./interface-adapters/in/rest/account-controller')({ server, createAccount }).map();

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});