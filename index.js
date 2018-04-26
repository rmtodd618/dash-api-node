const account = require('./lib/account');
const market = require('./lib/market');

const getAccountDetail = (address) => {
  return account.getBalance(address);
};

const getMarket = () => {
  return market.get();
};


module.exports = {
  getAccountDetail,
  getMarket,
};
