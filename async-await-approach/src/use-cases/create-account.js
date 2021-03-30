module.exports = ({ accountGateway, account }) => {
  
  const save = async (newAccount) => {
    return await accountGateway.saveNewAsync(newAccount);
  };

  const execute = async ({ balance }) => {
    const newAccount = account.createAccount({ balance });
    return await save(newAccount);
  };

  return {
    execute
  };
};