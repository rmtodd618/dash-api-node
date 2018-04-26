const axios = require('axios');
const marketBaseUrl = 'https://chainz.cryptoid.info/dash/api.dws?q=';

const get = () => {
  return axios.post(`${marketBaseUrl}ticker.usd`)
    .then((resp) => resp.data);
};

module.exports = {
  get,
};
