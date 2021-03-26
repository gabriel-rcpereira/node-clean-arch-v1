module.exports = ({ server, createAccount }) => {

  const postCreateAccount = (req, res) => {
    const { balance } = req.body;
    createAccount.execute(balance, (notification, data) => {
      if (notification.errors) {
        return res.status(422).json(notification);
      }
    });
    return res.status(201).send();
  };

  return {
    map: () => {
      server.post('/api/v1/accounts', postCreateAccount);
    }
  };
}