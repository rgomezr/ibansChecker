require('secrets')

function ShowIbanCheck(jsonResponse) {
    var output = `${jsonResponse.iban}, ${jsonResponse.valid}, ` +
        `${jsonResponse.iban_data.country}, ${jsonResponse.bank_data.zip}, ` +
        `${jsonResponse.bank_data.city}, ${jsonResponse.bank_data.name}`
    console.log(output);
}


const fs = require('node:fs')
const readLine = require('node:readline')

var headers = new Headers();
headers.append('apikey', process.env.API_KEY)

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: headers
}

const readLineProcess = readLine.createInterface({
    input: fs.createReadStream('placeYourIbans.txt'),
    crlfDelay: Infinity
});

readLineProcess.on('line', (ibanLine) => {
    fetch(`https://api.apilayer.com/bank_data/iban_validate?iban_number=${ibanLine}`, requestOptions)
        .then(response => {
            if (!response.ok || !response.status.toString().match(/^2\d{2}/)) {
                return response.json()
                    .then(({ message }) => {throw new Error(message || response.status)})
            } else {
                return response.json()
            }
        })
        .then(jsonResult => ShowIbanCheck(jsonResult))
        .catch(error => console.log(`${ibanLine}, ${error}`));
});