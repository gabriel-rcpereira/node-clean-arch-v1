const builder = require('../domains/business-errors')();

module.exports = () => {
  const execute = (balance, responseHandler) => {
    
    console.log(builder.builder().build());

    if (balance <= 0.0) {
      // responseHandler(builder().INSUFFICIENT_BALANCE().build(), undefined);
    }

    //TODO save account
  };

  return {
    execute
  };
};