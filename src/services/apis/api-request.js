import axios from 'axios';

/**
 * Api Request Function
 * @param {String} url
 * @param {String} requestType
 */
const apiRequest = async (url, requestType) => {
    return new Promise(async (resolve, reject) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const request = {
                method: requestType,
                url: url,
                headers: headers
            };
            const result = await axios(request);

            if (result?.data) {
                if (result?.data?.success) resolve(result?.data);
                else resolve(result);
            }
        } catch (err) {
            resolve(err?.response);
        }
    });
};

export default apiRequest;