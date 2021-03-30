module.exports = ({ server, createAccount, doOperation, validateOperationTypeMiddleware }) => {

  const postCreateAccount = async (req, res) => {
    const { balance } = req.body;
    
    try {
      const createdAccount = await createAccount.execute({ balance });
      return res.status(201).send({ id: createdAccount.id });
    } catch (error) {
      return res.status(422).json({ errors: error.messages });
    }
  };

  const putDoOperation = async (req, res) => {
    const { id } = req.params;
    const { operationType, value } = req.body;
    const operation = { id, operationType, value };
    try {
      await doOperation.execute(operation);
      return res.status(204).send();
    } catch (error) {
      const { isResourceNotFound, messages } = error;

      if (isResourceNotFound) {
        return res.status(404).send({ errors: messages });
      }

      return res.status(422).send({ errors: messages });
    }
  };

  return {
    map: () => {
      server.post('/api/v1/accounts', postCreateAccount);
      server.put('/api/v1/accounts/:id', validateOperationTypeMiddleware, putDoOperation);
    }
  };
}