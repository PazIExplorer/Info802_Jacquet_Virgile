//on recupère le clic pour lancer le payement
document.getElementsByClassName('cardSelector')[0].addEventListener('click', Clicked)

//dans le cas ou la personne a clique on recupere le prix
function Clicked() {
    var priceElement = document.getElementsByClassName('cost')[0];
    var prix = priceElement.innerText*100;
    stripeHandler.open({
        amount: prix
    });
}

//on appelle l'api rest avec une methode post 
var stripeHandler = StripeCheckout.configure({
    key: stripeKey,
    locale: 'fr',
    currency: 'eur',
    token: function(token) {
        var prix = document.getElementsByClassName('cost')[0];
        var prixJson = Math.round(prix.innerText*100);
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
            //si on a un code 200 on passe
            if(res.status==200){
            document.getElementsByClassName('result')[0].innerText = "votre demande de restoration a bien été traité";
            //renvoie a la page d'accueil
            setTimeout(function(){window.location='/'},5000)
        }
            //si on a un code 500 erreur interne
            else
            document.getElementsByClassName('result')[0].innerText = "votre demande de restoration a malheureusement echoue";
            return res.json(); 
        }).catch(function(error) {
            console.error(error)
        })
    }
});




