import apiRequest from "./api-request";
import { mainURL, requestTypeGET, extendLatest, extendAccessKey, extendBase, extendSymbols, extendConvert, extendFrom, extendTo, extendAmount } from "./path";

/**
* Convert Currency or Get Amount Api Function
* @param {String} baseCurrency
* @param {String} convertedCurrency
* @param {Boolean} isAmount
* @return {Object}
*/
const serviceConnectionConvertCurrencyAndAmount = async (baseCurrency, convertedCurrency, isAmount, amount) => {

    return new Promise(async (resolve, reject) => {

        let url = !isAmount ? mainURL + extendLatest + '?' + extendAccessKey + '&' + extendBase + '=' + baseCurrency + '&' + extendSymbols + '=' + convertedCurrency
            :
            mainURL + extendConvert + '?' + extendAccessKey + '&' + extendFrom + '=' + baseCurrency + '&' + extendTo + '=' + convertedCurrency + '&' + extendAmount + '=' + amount;

        const responseConvertCurrency = await apiRequest(
            url,
            requestTypeGET
        );
        if (responseConvertCurrency?.success) resolve(responseConvertCurrency);
        else resolve(responseConvertCurrency);
    });
};

export { serviceConnectionConvertCurrencyAndAmount };