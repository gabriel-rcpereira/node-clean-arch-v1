const each = require('jest-each').default;

const doOperation = require('./validate-operation-type')();

each([
  [ 'DEBIT' ],
  [ 'CREDIT' ]
]).test('Should validate with success operation given operation type equal to %s', (operationType) => {  
  //WHEN
  const execute = () => doOperation.execute(operationType);

  //THEN
  expect(() => execute()).not.toThrow();
})

each([
  [ 'DEBITO' ],
  [ 'CREDITO' ],
  [ 'XPTO' ]
]).test('Should validate with error given operation type equal to %s and different than CREDIT or DEBIT', (operationType) => {  
  //WHEN
  const execute = () => doOperation.execute(operationType);

  //THEN
  expect(() => execute()).toThrow();
})