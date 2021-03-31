const BusinessError = require('../domains/errors/bussiness-error');

module.exports = () => {

  const isOperationInvalid = (operationType) => {
    return (
      (!operationType) 
      || (operationType !== 'DEBIT' 
        && operationType !== 'CREDIT')
    );
  };

  const execute = (operationType) => {
    if (isOperationInvalid(operationType)) {
      throw new BusinessError(`The operation type '${operationType}' is invalid.`);
    }
  };

  return {
    execute
  };
}