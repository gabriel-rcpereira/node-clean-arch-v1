module.exports = ({ accountGateway, accountDomain, validateOperationType }) => {

  const update = (updatedAccount, callback) => {
    accountGateway.update(updatedAccount, (error) => {
      if (error.messages) {
        return callback({ messages: error.messages }, {});
      }
      
      return callback({}, {});
    });
  };

  const executeOperationByType = ({ account, operation }, callback) => {
    const operationStrategyToExecute = accountDomain[operation.operationType.toLowerCase()];

    operationStrategyToExecute({ account, value: operation.value }, (error, updatedAccount) => {
      if (error.messages) {
        return callback({ messages: error.messages }, {});
      }
      
      return update(updatedAccount, callback);
    });
  };
  
  const execute = (operation, callback) => {
    accountGateway.findById(operation.id, (error, foundAccount) => {
      if (error.messages) {
        return callback({ isApplicationError: true, messages: [ 'The operation could not be performed.' ] }, {});
      }

      if (!foundAccount.id) {
        return callback({ isResourceNotFound: true, messages: [ 'Account was not found.' ] }, {});
      }
          
      validateOperationType.execute(operation.operationType, (error) => {
        if (error.messages) {
          return callback(error, {});
        }

        return executeOperationByType({ account: foundAccount, operation }, callback);
      });
    });
  };

  return {
    execute
  };
}