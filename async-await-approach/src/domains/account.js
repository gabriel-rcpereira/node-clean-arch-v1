const BusinessError = require('./errors/bussiness-error');

module.exports = () => {
  const createAccount = ({ balance }) => {
    if (balance <= 0.0) {
      throw new BusinessError('Insuficient balance to create an account.');
    }

    return { balance };
  };

  const debit = ({ account, value }) => {
    if (account.balance == 0.0 || account.balance < value) {
      throw new BusinessError('Operation denied. Insuficient balance.');
    }

    const balanceAfterOperation = account.balance - value;
    return { ...account, balance: balanceAfterOperation.toFixed(2) };    
  };

  const credit = ({ account, value }) => {    
    if (value <= 0.0) {
      throw new BusinessError('Operation denied. To perform credit operation is needed a value greather than 0.');
    }

    const balanceAfterOperation = account.balance + value;
    return { ...account, balance: balanceAfterOperation.toFixed(2) };
  };

  return {
    createAccount,
    debit,
    credit
  };
};