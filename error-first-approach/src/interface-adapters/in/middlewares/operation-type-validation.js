module.exports = ({ validateOperationType }) => {

  const validateOperationTypeMiddleware = (req, res, next) => {      
    const { operationType } = req.body;
    
    validateOperationType.execute(operationType, (error) => {
      if (error.messages) {
        return res.status(400).send({ errors: error.messages });
      }

      next();
    });
  }

  return {
    validateOperationTypeMiddleware
  };
}