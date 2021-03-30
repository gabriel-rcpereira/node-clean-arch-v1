module.exports = ({ validateOperationType }) => {

  const validateOperationTypeMiddleware = (req, res, next) => {      
    const { operationType } = req.body;
    
    try {
      validateOperationType.execute(operationType);
    } catch (error) {
      return res.status(400).send({ errors: error.messages });      
    }
    
    next();
  };

  return {
    validateOperationTypeMiddleware
  };
}