module.exports = () => {
  const createAccount = ({ balance }) => {
    if (balance <= 0.0) {
      throw { messages: ['Insuficient balance to create an account.'] };
    }

    return { balance };
  };

  const debit = ({ account, value }) => {
    if (account.balance == 0.0 || account.balance < value) {
      throw { messages: ['Operation denied. Insuficient balance.'] };
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