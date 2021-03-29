module.exports = () => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/bank-account', {useNewUrlParser: true, useUnifiedTopology: true});
  
  const { Schema } = mongoose;
  
  const AccountEntity = mongoose.model('account', new Schema({ balance: Number }));

  return {
    AccountEntity
  };
}