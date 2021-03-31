const each = require('jest-each').default;

const CreateAccount = require('./create-account');
const accountDomain = require('../domains/account')();
const BusinessError = require('../domains/errors/bussiness-error');
   
describe('Create account Unit tests', () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  })

  each`
    id            | balance
    ${'uuid_1'}   | ${'0.01'}
    ${'uuid_2'}   | ${'0.1'}
    ${'uuid_3'}   | ${'150.55'}
    ${'uuid_4'}   | ${'101052.10'}
  `.test('Should create an account given balance greater than 0.0 and equal to $balance', async ({id, balance}) => {
    //GIVEN
    const accountDomainSpy = jest.spyOn(accountDomain, 'createAccount');
    const accountGateway = {
      saveNewAsync: jest.fn().mockImplementation((account) => Promise.resolve({ id, balance: account.balance }))
    };
  
    const { execute } = CreateAccount({ accountGateway, accountDomain });
  
    const account = { balance };
    
    //WHEN
    const createdAccount = await execute(account);
  
    //THEN  
    expect(createdAccount).toBeTruthy();
    expect(createdAccount.id).toEqual(id);
    expect(createdAccount.balance).toEqual(balance);

    expect(accountDomainSpy).toHaveBeenCalledTimes(1);
    expect(accountDomainSpy).toHaveBeenCalledWith({ balance });
  
    expect(accountGateway.saveNewAsync).toHaveBeenCalledTimes(1);
    expect(accountGateway.saveNewAsync).toHaveBeenCalledWith({ balance });
  })  

  each`
    id            | balance
    ${'uuid_1'}   | ${'0.00'}
    ${'uuid_2'}   | ${'0.0'}
    ${'uuid_3'}   | ${'-1.0'}
    ${'uuid_3'}   | ${'-150.55'}
    ${'uuid_4'}   | ${'-101052.10'}
  `.test('Should throw error and not create an account given balance less than 0.0 and equal to $balance', async ({ id, balance }) => {
    //GIVEN
    const accountDomainSpy = jest.spyOn(accountDomain, 'createAccount');
    const accountGateway = {
      saveNewAsync: jest.fn().mockImplementation((account) => Promise.resolve({ id, balance: account.balance }))
    };

    const { execute } = CreateAccount({ accountGateway, accountDomain });

    const account = { balance };
    
    //WHEN
    const callbackExecution = () => execute(account);

    //THEN
    expect(callbackExecution()).rejects.toThrow(BusinessError);
    
    expect(accountDomainSpy).toHaveBeenCalledTimes(1);
    expect(accountGateway.saveNewAsync).not.toHaveBeenCalled();
  })  
})