module.exports = ({ accountGateway, account }) => {
  
  const execute = ({ balance }, callback) => {        

    const save = (newAccount) => {
      accountGateway.save(newAccount, (error, data) => {
        if (error.messages) {
          callback(error = { isApplicationError: true, messages: [ 'Application could not create the account.' ] }, data = {});
        }        
      });
    };

    account.createAccount({ balance }, (error, newAccount) => {
      if (error.messages) {
        callback(error, data = {});
      }
    
      save(newAccount);
      callback(errors = [ ], data = newAccount);
    });
  };

  return {
    execute
  };
};