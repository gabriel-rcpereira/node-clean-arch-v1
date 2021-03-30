module.exports = ({ AccountEntity }) => {
  
  const saveNew = (account, callback) => {
    const createdAccount = new AccountEntity(account);
    createdAccount.save((error, data) => {
      if (error) {
        return callback({ messages: [ error ]}, { });
      }

      return callback({ }, { id: data._id, balance: data.balance });
    });    
  };

  const findById = (id, callback) => {
    AccountEntity.findById(id, (error, data) => {
      if (error) {
        console.error('[repository]', 'finding account by id.', error);
        
        return callback({ messages: [ error ] }, {});
      }
            
      if (data) {
        const foundAccount = { id: data._id, balance: data.balance, __v: data.__v };
        return callback({}, foundAccount);
      }

      return callback({}, {});
    });
  };

  const update = (account, callback) => {
    const filter = { _id: account.id, __v: account.__v };
    const accountToUpdate = { balance: account.balance };

    AccountEntity.findOneAndUpdate(filter, accountToUpdate, (error, data) => {
      if (error) {
        return callback({ messages: [ error ] }, {});
      }

      return callback({}, data);
    });
  };

  return {
    saveNew,
    findById,
    update
  }
};