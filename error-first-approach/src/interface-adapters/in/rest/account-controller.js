module.exports = ({ server, createAccount, doOperation, validateOperationTypeMiddleware }) => {

  const postCreateAccount = (req, res) => {
    const { balance } = req.body;
    
    createAccount.execute({ balance }, (error, data) => {      
      if (!error.messages) {
        return res.status(201).send({ id: data.id });
      }

      const statusError = error.isApplicationError ? 500 : 422;
      
      return res.status(statusError).json({ errors: error.messages });
    });
  };

  const putDoOperation = (req, res) => {
    const { id } = req.params;
    const { operationType, value } = req.body;
    const operation = { id, operationType, value };

    doOperation.execute(operation, (error, data) => {
      if (!error.messages) {
        return res.status(204).send();
      }

      if (error.isApplicationError) {
        return res.status(500).json({ errors: error.messages });  
      }

      if (error.isResourceNotFound) {
        return res.status(404).json({ errors: error.messages });  
      }
      
      return res.status(422).json({ errors: error.messages });
    });
  };

  return {
    map: () => {
      server.post('/api/v1/accounts', postCreateAccount);
      server.put('/api/v1/accounts/:id', validateOperationTypeMiddleware, putDoOperation);
    }
  };
}