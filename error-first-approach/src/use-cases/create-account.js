module.exports = ({ accountGateway, account }) => {
  
  const save = (newAccount, callback) => {
    accountGateway.saveNew(newAccount, (error, savedAccount) => {
      if (error.messages) {
        return callback({ isApplicationError: true, messages: [ 'Application could not create the account.' ] }, {});
      }

      return callback({}, savedAccount);
    });
  };

  const execute = ({ balance }, callback) => {        
    account.createAccount({ balance }, (error, newAccount) => {
      if (error.messages) {
        return callback(error, {});
      }
    
      save(newAccount, callback);
    });
  };

  return {
    execute
  };
};