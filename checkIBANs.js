require('secrets')
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
    input: fs.createReadStream('ibansToCheck.txt'),
    crlfDelay: Infinity
});

readLineProcess.on('line', (ibanLine) => {
    fetch(`https://api.apilayer.com/bank_data/iban_validate?iban_number=${ibanLine}`, requestOptions)
        .then(response => response.json())
        .then(jsonResult => {
            console.log(`Check for IBAN: ${jsonResult.iban} - valid: ${jsonResult.valid}`)
        })
        .catch(error => console.log(`Error from request: ${error}`));
});