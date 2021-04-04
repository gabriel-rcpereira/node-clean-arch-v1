const { Server, Response, Request } = require('./__test-hooks__/rest-hook')();

const BusinessError = require('../../../domains/errors/bussiness-error');
const ResourceNotFoundError = require('../../../domains/errors/resource-not-found-error');
const AccountController = require('./account-controller');

describe('[POST][/api/v1/accounts] Unit test to creat an account', () => {
  
  test('Should create an account given a valid balance in body when use case executes with success', async () => {
    // GIVEN    
    const serverInstance = Server();    
    const requestInstance = Request({ body: { balance: 100.0 } })    
    const responseInstance = Response();

    const createdAccount = { id: 'uuid', balance: 100.0 };    
    const createAccount = {
      execute: jest.fn().mockImplementation(() => Promise.resolve(createdAccount))
    };
    
    const validateOperationTypeMiddleware = { };
    const doOperation = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const postCreateAccount = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts', methodName: 'postCreateAccount' });

    // WHEN
    await postCreateAccount(requestInstance, responseInstance);

    // THEN
    expect(createAccount.execute).toHaveBeenCalledTimes(1);
    expect(createAccount.execute).toHaveBeenCalledWith({ balance: 100.0 });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(201);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ id: createdAccount.id });
  })

  test('Should not create an account given invalid balance when use case executes with error', async () => {
    // GIVEN    
    const serverInstance = Server();    
    const requestInstance = Request({ body: { balance: 0.0 } })    
    const responseInstance = Response();

    const createAccount = {
      execute: jest.fn().mockImplementation(() => Promise.reject(new BusinessError('something goes wrong')))
    };
    
    const validateOperationTypeMiddleware = { };
    const doOperation = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const postCreateAccount = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts', methodName: 'postCreateAccount' });

    // WHEN
    await postCreateAccount(requestInstance, responseInstance);

    // THEN
    expect(createAccount.execute).toHaveBeenCalledTimes(1);
    expect(createAccount.execute).toHaveBeenCalledWith({ balance: 0.0 });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(422);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ errors: ['something goes wrong'] });
  })

  test('Should not create an account given an empty body when use case executes with error', async () => {
    // GIVEN    
    const serverInstance = Server();    
    const requestInstance = Request({ body: { } });
    const responseInstance = Response();

    const createAccount = {
      execute: jest.fn().mockImplementation(() => Promise.reject(new BusinessError('something goes wrong')))
    };
    
    const validateOperationTypeMiddleware = { };
    const doOperation = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const postCreateAccount = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts', methodName: 'postCreateAccount' });

    // WHEN
    await postCreateAccount(requestInstance, responseInstance);

    // THEN
    expect(createAccount.execute).toHaveBeenCalledTimes(1);
    expect(createAccount.execute).toHaveBeenCalledWith({ balance: undefined });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(422);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ errors: ['something goes wrong'] });
  })
});

describe('[PUT][/api/v1/accounts/:id] Unit test to execute an operation', () => {
  
  test('Should execute with success an operation given valid parameters as id, operation type and value', async () => {
    // GIVEN    
    const serverInstance = Server();
    
    const body = { operationType: 'CREDIT', value: 105.0 };
    const params = { id: 'uuid' };
    const requestInstance = Request({ body, params });

    const responseInstance = Response();

    const doOperation = {
      execute: jest.fn().mockImplementation(() => Promise.resolve())
    };
    
    const validateOperationTypeMiddleware = { };
    const createAccount = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const putDoOperation = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts/:id', methodName: 'putDoOperation' });

    // WHEN
    await putDoOperation(requestInstance, responseInstance);

    // THEN
    expect(doOperation.execute).toHaveBeenCalledTimes(1);
    expect(doOperation.execute).toHaveBeenCalledWith({ id: 'uuid', operationType: 'CREDIT', value: 105.0 });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(204);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith();
  })

  test('Should execute with error an operation given parameters as id, operation type and value when use case throws not found error', async () => {
    // GIVEN    
    const serverInstance = Server();
    
    const body = { operationType: 'CREDIT', value: 105.0 };
    const params = { id: 'uuid' };
    const requestInstance = Request({ body, params });

    const responseInstance = Response();

    const doOperation = {
      execute: jest.fn().mockImplementation(() => Promise.reject(new ResourceNotFoundError('something does not exist')))
    };
    
    const validateOperationTypeMiddleware = { };
    const createAccount = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const putDoOperation = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts/:id', methodName: 'putDoOperation' });

    // WHEN
    await putDoOperation(requestInstance, responseInstance);

    // THEN
    expect(doOperation.execute).toHaveBeenCalledTimes(1);
    expect(doOperation.execute).toHaveBeenCalledWith({ id: 'uuid', operationType: 'CREDIT', value: 105.0 });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(404);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ errors: [ 'something does not exist' ] });
  })

  test('Should execute with error an operation given parameters as id and body parameters ommited when use case throws business error', async () => {
    // GIVEN    
    const serverInstance = Server();
    
    const body = { };
    const params = { id: 'uuid' };
    const requestInstance = Request({ body, params });

    const responseInstance = Response();

    const doOperation = {
      execute: jest.fn().mockImplementation(() => Promise.reject(new BusinessError('something goes wrong')))
    };
    
    const validateOperationTypeMiddleware = { };
    const createAccount = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const putDoOperation = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts/:id', methodName: 'putDoOperation' });

    // WHEN
    await putDoOperation(requestInstance, responseInstance);

    // THEN
    expect(doOperation.execute).toHaveBeenCalledTimes(1);
    expect(doOperation.execute).toHaveBeenCalledWith({ id: 'uuid', operationType: undefined, value: undefined });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(422);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ errors: [ 'something goes wrong' ] });
  })

  test('Should execute with error an operation given parameters as id, operation type and value when use case throws business error', async () => {
    // GIVEN    
    const serverInstance = Server();
    
    const body = { operationType: 'CREDIT', value: 105.0 };
    const params = { id: 'uuid' };
    const requestInstance = Request({ body, params });

    const responseInstance = Response();

    const doOperation = {
      execute: jest.fn().mockImplementation(() => Promise.reject(new BusinessError('something goes wrong')))
    };
    
    const validateOperationTypeMiddleware = { };
    const createAccount = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    accountControllerInstance.map();

    const putDoOperation = serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts/:id', methodName: 'putDoOperation' });

    // WHEN
    await putDoOperation(requestInstance, responseInstance);

    // THEN
    expect(doOperation.execute).toHaveBeenCalledTimes(1);
    expect(doOperation.execute).toHaveBeenCalledWith({ id: 'uuid', operationType: 'CREDIT', value: 105.0 });

    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedStatusFunction).toHaveBeenCalledWith(422);

    expect(responseInstance.mockedSendFunction).toHaveBeenCalledTimes(1);
    expect(responseInstance.mockedSendFunction).toHaveBeenCalledWith({ errors: [ 'something goes wrong' ] });
  })

  test('Should make sure the middleware to validate operation type was added into router', async () => {
    // GIVEN    
    const serverInstance = Server();    
    const doOperation = { };    
    const validateOperationTypeMiddleware = () => {};
    const createAccount = { };
    const accountControllerInstance = AccountController({ server: serverInstance, createAccount, doOperation, validateOperationTypeMiddleware });
    
    // WHEN
    accountControllerInstance.map();

    // THEN
    expect(serverInstance.retrieveRouthedMethodByRouter({ route: '/api/v1/accounts/:id', methodName: 'validateOperationTypeMiddleware' })).toBeTruthy();
  })

});