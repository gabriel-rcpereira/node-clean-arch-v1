module.exports = () => {
  const createAccount = ({ balance }, callback) => {
    if (balance <= 0.0) {
      return callback(error =  { messages: [ 'Insuficient balance to create an account.' ] }, data = {});
    }

    return callback(error = {}, data = { balance });
  };

  const debit = ({ account, value }, callback) => {
    if (account.balance == 0.0 || account.balance < value) {
      return callback(error = { messages: [ 'Operation denied. Insuficient balance.' ] }, data = {});
    }

    const balanceAfterOperation = account.balance - value;
    const updatedAccount = { ...account, balance: balanceAfterOperation.toFixed(2) };
    return callback(error = {}, data = updatedAccount);
  };

  const credit = ({ account, value }, callback) => {    
    const balanceAfterOperation = account.balance + value;
    const updatedAccount = { ...account, balance: balanceAfterOperation.toFixed(2) };
    return callback(error = {}, data = updatedAccount);
  };

  return {
    createAccount,
    debit,
    credit
  };
};