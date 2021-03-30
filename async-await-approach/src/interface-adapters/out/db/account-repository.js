module.exports = ({ AccountEntity }) => {
  
  const saveNewAsync = async (account) => {
    const createdAccount = new AccountEntity(account);
    const savedAccount = await createdAccount.save();

    return { id: savedAccount._id, balance: savedAccount.balance };
  };

  const saveNew = (account, callback) => {
    const createdAccount = new AccountEntity(account);
    createdAccount.save((error, data) => {
      if (error) {
        return callback({ messages: [ error ]}, { });
      }

      return callback({ }, { id: data._id, balance: data.balance });
    });
  };

  const findByIdAsync = async (id) => {
    const foundAccount = await AccountEntity.findById(id);
    if (foundAccount) {
      return { id: foundAccount._id, balance: foundAccount.balance, __v: foundAccount.__v };
    }

    return undefined;
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

  const updateAsync = async (account) => {
    const filter = { _id: account.id, __v: account.__v };
    const accountToUpdate = { balance: account.balance };
    const foundAccount = await AccountEntity.findOneAndUpdate(filter, accountToUpdate);
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
    saveNewAsync,
    findByIdAsync,
    findById,
    update,
    updateAsync
  }
};