module.exports = () => {
  
  const save = ({ account }, callback) => {
    console.log('saving account.', account);
    // callback(error = { messages: [ 'Invalid database' ] }, data = {});
  };

  return {
    save
  }
};