module.exports = ({ AccountEntity }) => {
  
  const saveNew = (account, callback) => {
    // console.log('saving account.', account);
    // callback(error = { messages: [ 'Invalid database' ] }, data = {});

    const createdAccount = new AccountEntity(account);
    createdAccount.save((error, saved) => {
      if (error) {
        callback(error = { messages: [ error ]}, data = { });
      }

      callback(error = { }, data = saved);
    });    
  };

  return {
    save: saveNew
  }
};