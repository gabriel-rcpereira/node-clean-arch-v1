module.exports = ({ accountGateway, accountDomain, validateOperationType }) => {

  const update = async (updatedAccount) => {
    return await accountGateway.updateAsync(updatedAccount);
  };

  const executeOperationByType = ({ account, operation }) => {    
    const operationStrategyToExecute = accountDomain[operation.operationType.toLowerCase()];
    return operationStrategyToExecute({ account, value: operation.value });
  };
  
  const execute = async (operation) => {
    const foundAccount = await accountGateway.findByIdAsync(operation.id);

    if (!foundAccount) {
      throw { isResourceNotFound: true, messages: [ 'Resource was not found.' ] };
    }

    validateOperationType.execute(operation.operationType);
    
    const accountAfterOperation = executeOperationByType({ account: foundAccount, operation });
    return await update(accountAfterOperation);    
  };

  return {
    execute
  };
}