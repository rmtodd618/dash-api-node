const axios = require('axios');
const utils = require('./utils');

const baseAccountUrl = 'https://chainz.cryptoid.info/dash/api.dws?q=';

const getBalance = (address) => {
  let request = utils.requestPayload(address);
  return axios.post(`${baseAccountUrl}getbalance&a=`, request)
    .then((resp) => resp.data);
};


module.exports = {
  baseAccountUrl,
  getBalance,
};
