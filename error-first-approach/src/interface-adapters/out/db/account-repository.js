module.exports = ({ AccountEntity }) => {
  
  const saveNew = (account, callback) => {
    const createdAccount = new AccountEntity(account);
    createdAccount.save((error, data) => {
      if (error) {
        return callback(error = { messages: [ error ]}, data = { });
      }

      return callback(error = { }, data = { id: data._id, balance: data.balance });
    });    
  };

  const findById = (id, callback) => {
    AccountEntity.findById(id, (error, data) => {
      if (error) {
        console.error('[repository]', 'finding account by id.', error);
        
        return callback(error = { messages: [ error ] }, data = {});
      }
            
      if (data) {
        const foundAccount = { id: data._id, balance: data.balance, __v: data.__v };
        return callback(error = { }, data = foundAccount);
      }

      return callback(error = {}, data = {});
    });
  };

  const update = (account, callback) => {
    const accountFilter = { _id: account.id, __v: account.__v };
    const accountToUpdate = { balance: account.balance };

    AccountEntity.findOneAndUpdate(accountFilter, accountToUpdate, (error, data) => {
      if (error) {
        return callback(error = { messages: [ error ] }, data = {});
      }

      return callback(error = {}, data = {});
    });
  };

  return {
    saveNew,
    findById,
    update
  }
};