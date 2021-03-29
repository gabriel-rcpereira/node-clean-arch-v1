module.exports = () => {
  const createAccount = ({ balance }, callback) => {
    if (balance <= 0.0) {
      callback(error =  { messages: [ 'Insuficient balance to create an account.' ] }, data = {});
      return;
    }

    return callback(error = {}, data = { balance });
  };

  return {
    createAccount
  };
};