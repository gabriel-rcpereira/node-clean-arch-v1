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
      return callback({ messages: [ `The '${operationType}' operation type is invalid.` ] }, {});
    }

    return callback({}, {});
  };

  return {
    execute
  };
}