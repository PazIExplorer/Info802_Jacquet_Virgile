document.getElementsByClassName('cardSelector')[0].addEventListener('click', Clicked)


function Clicked() {
    var priceElement = document.getElementsByClassName('cost')[0];
    var prix = priceElement.innerText*100;
    stripeHandler.open({
        amount: prix
    });
}

var stripeHandler = StripeCheckout.configure({
    key: stripeKey,
    locale: 'fr',
    currency: 'eur',
    token: function(token) {
        var prix = document.getElementsByClassName('cost')[0];
        var prixJson = Math.round(prix.innerText*100);
        console.log(token.id);
        console.log(prixJson);
        fetch('/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                price: prixJson
            })
        }
        ).then(function(res) {
            console.log(res);
            if(res.status==200){
            document.getElementsByClassName('result')[0].innerText = "votre demande de restoration a bien été traité";
            setTimeout(function(){window.location='/'},5000)
        }
            else
            document.getElementsByClassName('result')[0].innerText = "votre demande de restoration a malheureusement echoue";
            return res.json(); 
        }).catch(function(error) {
            console.error(error)
        })
    }
});




