module.exports = () => {
  const createAccount = ({ balance }, callback) => {
    if (balance <= 0.0) {
      return callback({ messages: [ 'Insuficient balance to create an account.' ] }, {});
    }

    return callback({}, { balance });
  };

  const debit = ({ account, value }, callback) => {
    if (account.balance == 0.0 || account.balance < value) {
      return callback({ messages: [ 'Operation denied. Insuficient balance.' ] }, {});
    }

    const balanceAfterOperation = account.balance - value;
    const updatedAccount = { ...account, balance: balanceAfterOperation.toFixed(2) };
    return callback({}, updatedAccount);
  };

  const credit = ({ account, value }, callback) => {    
    const balanceAfterOperation = account.balance + value;
    const updatedAccount = { ...account, balance: balanceAfterOperation.toFixed(2) };
    return callback({}, updatedAccount);
  };

  return {
    createAccount,
    debit,
    credit
  };
};