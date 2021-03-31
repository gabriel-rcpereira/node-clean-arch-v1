const BusinessExceptionError = require('./errors/bussiness-error');

module.exports = () => {
  const createAccount = ({ balance }) => {
    if (balance <= 0.0) {
      throw new BusinessExceptionError('Insuficient balance to create an account.');
    }

    return { balance };
  };

  const debit = ({ account, value }) => {
    if (account.balance == 0.0 || account.balance < value) {
      throw new BusinessExceptionError('Operation denied. Insuficient balance.');
    }

    const balanceAfterOperation = account.balance - value;
    return { ...account, balance: balanceAfterOperation.toFixed(2) };    
  };

  const credit = ({ account, value }) => {    
    const balanceAfterOperation = account.balance + value;
    return { ...account, balance: balanceAfterOperation.toFixed(2) };
  };

  return {
    createAccount,
    debit,
    credit
  };
};