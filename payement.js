function payement()
{
    document.getElementsByClassName('cardSelector')[0].addEventListener('click', purchaseClicked)
}

payement();

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'fr',
    currency: 'eur',
    token: function(token) {
        var priceElement = document.getElementsByClassName('totalCost')[0];
        var price = parseFloat(priceElement.innerText.replace('€', '')) * 100;

        fetch('/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                price: price
            })
        }
        ).then(function(res) {
            return res.json()
        }).then(function(data) {
            document.getElementsByClassName('totalCost')[0].innerText = "votre demande de restoration a bien été traité";
            alert(data.message)
        }).catch(function(error) {
            console.error(error)
        })
    }
});

function purchaseClicked() {
    var priceElement = document.getElementsByClassName('totalCost')[0];
    var price = parseFloat(priceElement.innerText.replace('€', '')) * 100;
    stripeHandler.open({
        amount: price
    });
}