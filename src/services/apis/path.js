const requestTypeGET = 'GET'; // Request Type GET

const accessKey = '3f87c223787557fdf2f1c8c89e3396a3'; //API Access Key

const devApiURL = 'https://api.exchangeratesapi.io/v1/'; //When you want to change mainURL please add a new parameter like devApiURL
const mainURL = devApiURL;

/* API URLs Extensions --start-- */
const extendLatest = 'latest';
const extendConvert = 'convert';
const extendAccessKey = 'access_key=' + accessKey;
const extendBase = 'base';
const extendFrom = 'from';
const extendTo = 'to';
const extendSymbols = 'symbols';
const extendAmount = 'amount';
/* --end-- */

export { mainURL, requestTypeGET, extendLatest, extendConvert, extendAccessKey, extendBase, extendFrom, extendTo, extendSymbols, extendAmount };