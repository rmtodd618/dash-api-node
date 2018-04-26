const account = require('../../lib/account.js');
const utils = require('../../lib/utils');
const moxios = require('moxios');
const sinon = require('sinon');
const stub = sinon.stub;
const chai = require('chai');
const assert = chai.assert;
const faker = require('faker');
const randomAddress = faker.finance.bitcoinAddress;
const baseAccountUrl = account.baseAccountUrl;

describe('Account', () => {
  let requestPayloadStubs;
  let address;
  let requestObject;

  let accountDetailResponse = {
    balance: 12009800000.02,
  };

  beforeEach(() => {
    moxios.install();
    requestPayloadStubs = stub(utils, 'requestPayload');
    address = randomAddress();
  });

  afterEach(() => {
    moxios.uninstall();
    requestPayloadStubs.restore();
  });


  describe('#detail', () => {
    beforeEach(() => {
      moxios.stubRequest(`${baseAccountUrl}getbalance&a=`, {
        status: 200,
        response: accountDetailResponse,
      });
    });

    it('returns correct payload', () => {
      return account.getBalance()
        .then((payload) => {
          assert.deepEqual(payload, accountDetailResponse);
        });
    });

    it('calls requestPayload properly', () => {
      return account.getBalance(address)
        .then((payload) => {
          assert(requestPayloadStubs.withArgs(address).calledOnce);
        });
    });

    it('calls axios properly', (done) => {
      requestPayloadStubs.withArgs(address).returns(requestObject);

      account.getBalance(address);

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();
        assert.equal(request.config.method, 'post');
        assert.equal(request.config.url, `${baseAccountUrl}getbalance&a=`);
        assert.equal(request.config.payload, requestObject);
        done();
      });
    });
  });

});
