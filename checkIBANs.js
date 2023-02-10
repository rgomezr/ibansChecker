require('secrets')

var headers = new Headers();
headers.append('apikey', process.env.API_KEY)

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: headers
}
var ibanToCheck = ''

fetch(`https://api.apilayer.com/bank_data/iban_validate?iban_number=${ibanToCheck}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log(`Error from request: ${error}`));