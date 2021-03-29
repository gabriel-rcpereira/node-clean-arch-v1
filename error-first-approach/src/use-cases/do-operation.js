module.exports = ({ accountGateway, account }) => {

  const execute = (operation, callback) => {
    accountGateway.findById(operation.id, (error, data) => {
      if (error.messages) {
        return callback(error = { isApplicationError: true, messages: [ 'The operation could not be performed.' ] }, data = {});
      }

      if (!data.id) {
        return callback(error = { isResourceNotFound: true, messages: [ 'Account was not found.' ] }, data = {});
      }
      
      if (operation.operationType === 'DEBIT') {        
        account.debit({ account: data, value: operation.value }, (error, data) => {
          if (error.messages) {
            return callback(error = { messages: error.messages }, data = {});            
          }
          
          accountGateway.update(data, (error, data) => {
            if (error.messages) {
              return callback(error = { messages: error.messages }, data = {});
            }
          });

          return callback(error = {}, data = {});
        });
      } else if (operation.operationType === 'CREDIT') {        
        account.credit({ account: data, value: operation.value }, (error, data) => {
          if (error.messages) {
            return callback(error = { messages: error.messages }, data = {});            
          }
          
          accountGateway.update(data, (error, data) => {
            if (error.messages) {
              return callback(error = { messages: error.messages }, data = {});
            }
          });

          return callback(error = {}, data = {});
        });
      } else {
        return callback(error = { messages: [ `The '${operation.operationType}' operation type is invalid.` ] }, data = {});
      }


    });
  };

  return {
    execute
  };
}