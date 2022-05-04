const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch the API for the exchange rate and update the DOM with the data returned
function calculate() {
    console.log('running');
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/6f44c0f6bbd6ab7f09dbc6af/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
    // console.log(data);
        const rate = data.conversion_rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

//Event listeners for each conversion rate and the swap button. the
// conversion rates change with the click of the arrow or input of a
// different amount
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();
