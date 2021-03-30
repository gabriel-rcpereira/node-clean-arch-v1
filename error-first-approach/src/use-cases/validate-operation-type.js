module.exports = () => {

  const isOperationInvalid = (operationType) => {
    return (
      (!operationType) ||
      (operationType !== 'DEBIT' &&
      operationType !== 'CREDIT')
    );
  };

  const execute = (operationType, callback) => {
    if (isOperationInvalid(operationType)) {
      return callback({ messages: [ `The operation type '${operationType}' is invalid.` ] }, {});
    }

    return callback({}, {});
  };

  return {
    execute
  };
}