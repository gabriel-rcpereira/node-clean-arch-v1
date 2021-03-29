module.exports = ({ server, createAccount }) => {

  const postCreateAccount = (req, res) => {
    const { balance } = req.body;
    
    createAccount.execute({ balance }, (error, newAccount) => {
      if (!error.messages) {
        return res.status(201).send({ id: newAccount.id });
      }

      const statusError = error.isApplicationError ? 500 : 422;
      
      return res.status(statusError).json({ errors: error.messages });
    });
  };

  return {
    map: () => {
      server.post('/api/v1/accounts', postCreateAccount);
    }
  };
}