const ResouceNotFoundError = require('../../../domains/errors/resource-not-found-error');

module.exports = ({ server, createAccount, doOperation, validateOperationTypeMiddleware }) => {

  const postCreateAccount = async (req, res) => {
    const { balance } = req.body;
    
    try {
      const createdAccount = await createAccount.execute({ balance });
      return res.status(201).send({ id: createdAccount.id });
    } catch (error) {
      const { message } = error;
      return res.status(422).send({ errors: [ message ] });
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
      const { message } = error;

      if (error instanceof ResouceNotFoundError) {
        return res.status(404).send({ errors: [ message ] });
      }

      return res.status(422).send({ errors: [ message ] });
    }
  };

  return {
    map: () => {
      server.post('/api/v1/accounts', postCreateAccount);
      server.put('/api/v1/accounts/:id', validateOperationTypeMiddleware, putDoOperation);
    }
  };
}