module.exports = ({ accountGateway, accountDomain }) => {
  
  const save = async (newAccount) => {
    return await accountGateway.saveNewAsync(newAccount);
  };

  const execute = async ({ balance }) => {
    const newAccount = accountDomain.createAccount({ balance });
    return await save(newAccount);
  };

  return {
    execute
  };
};