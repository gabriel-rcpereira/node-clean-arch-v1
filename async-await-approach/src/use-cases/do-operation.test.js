const { default: each } = require('jest-each');

const DoOperation = require('./do-operation');
const ResouceNotFoundError = require('../domains/errors/resource-not-found-error');
const BusinessError = require('../domains/errors/bussiness-error');

const accountDomain = require('../domains/account')();

describe('Do Operation unit test', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  })

  each([
    [ 'CREDIT' ],
    [ 'DEBIT' ]
  ]).test('Should execute do operation with error given a %s operation type when resource was not found', (operationType) => {
    // GIVEN    
    const mockedAccountGateway = {
      findByIdAsync: jest.fn().mockImplementation((id) => Promise.resolve(undefined))
    };

    const mockedValidateOperationType = {
      execute: jest.fn()
    };

    const { execute } = DoOperation({ accountGateway: mockedAccountGateway, accountDomain, validateOperationType: mockedValidateOperationType });

    // WHEN
    const callbackExecution = () => execute({ id: 'uuid', operationType, value: 225.30 });

    // THEN
    expect(callbackExecution()).rejects.toThrow(ResouceNotFoundError);

    expect(mockedAccountGateway.findByIdAsync).toHaveBeenCalledTimes(1);
    expect(mockedValidateOperationType.execute).not.toHaveBeenCalled();
  })

  each([
    [ 0.0 ],
    [ -0.01 ],
    [ -100.01 ]
  ]).test('Should execute do operation with error given a CREDIT operation and %d value type and balance less than 0.0', (value) => {
    // GIVEN
    const accountDomainSpy = jest.spyOn(accountDomain, 'credit');

    const mockedAccount = { id: 'uuid', balance: 100.0 };

    const mockedAccountGateway = {
      findByIdAsync: jest.fn().mockImplementation((id) => Promise.resolve(mockedAccount))
    };

    const mockedValidateOperationType = {
      execute: jest.fn()
    };

    const { execute } = DoOperation({ accountGateway: mockedAccountGateway, accountDomain, validateOperationType: mockedValidateOperationType });

    // WHEN
    const callbackExecution = () => execute({ id: 'uuid', operationType: 'CREDIT', value });

    // THEN
    expect(callbackExecution()).rejects.toThrow(BusinessError);
    
    expect(accountDomainSpy).toThrow();
    expect(mockedAccountGateway.findByIdAsync).toHaveBeenCalledTimes(1);
    expect(mockedValidateOperationType.execute).not.toHaveBeenCalled();
  })
})