module.exports = ({ accountGateway, account }) => {
  
  const execute = ({ balance }, callback) => {        

    const save = (newAccount) => {
      accountGateway.saveNew(newAccount, (error, data) => {
        if (error.messages) {
          return callback(error = { isApplicationError: true, messages: [ 'Application could not create the account.' ] }, data = {});
        }

        return callback(errors = [ ], data);
      });
    };

    account.createAccount({ balance }, (error, newAccount) => {
      if (error.messages) {
        return callback(error, data = {});
      }
    
      save(newAccount);
    });
  };

  return {
    execute
  };
};