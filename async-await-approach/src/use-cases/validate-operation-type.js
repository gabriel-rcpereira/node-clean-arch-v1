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
      throw { messages: [ `The operation type '${operationType}' is invalid.` ] };
    }
  };

  return {
    execute
  };
}