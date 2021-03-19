//les requirements basique
const { request } = require('http');

const express = require('express')
const app = express();

const soap = require('soap');
const port = process.env.PORT || 3000;
app.listen( port , function(){console.log(`client sur le port :${port}`)});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requirement pour avoir de l'html javascript
app.set("view engine", "ejs");
app.use(require("express").urlencoded());
app.get('/',function(req,res){
    res.render("vue");
});

//requirements api rest
const cleSecret = "sk_test_51IWLJZI6Zz8My46gGhI1sbowiw2TzTUUBjSPioIxFjdP7BOaaTwz2tELnSCtc5KZki4IcNlUZg7p0QkQ3pqgB8Jo00H8UOXbqw"
const clePublic = "pk_test_51IWLJZI6Zz8My46gjMAzscBHYvVQEJRJRf9xrUWRpgLOLSfoPLf2cUGjUwuE7NeEPqdXp2BuHRX0BnNL0NqMPsT30044cgXfZJ"
const stripe = require("stripe")(cleSecret);
app.use("/",express.static(__dirname));


//appel a l'api rest
app.post('/transaction', function(req, res)
{
      
        if (req.body == null) {
          res.status(500).end();
        } else {
          stripe.charges.create({
            amount: req.body.price,
            source: req.body.stripeTokenId,
            currency: 'eur'
          }).then(function() {
            res.json({ message: 'Merci pour votre achat' })
            res.status(200).end()
          }).catch(function() {
            res.status(500).end()
          });
        }
});






//l'appel au service soap
app.post("/cost", function(req, res)
{
    //url du wsdl soap, sur un autre serveur mais sur le meme github
    var url = 'https://info802-soap-service.herokuapp.com/wsdl?wsdl'; 
    var args = { poids: req.body.poids, distance: req.body.distance, prix: req.body.prix };
    //on cree le service soap et ce qu'on veut recuperer
    soap.createClient(url, function (err, client) {
        client.coutLivraison(args, function (err, result, raw) {
            res.render("renduCoutTotal",{
                 clePublic : clePublic,
                 prixPoid: result.prixPoid,
                 prixDist: result.prixDist,
                 prixSansFrais: result.prixSansFrais,
                 prixTotal: result.prixTotal, 
                 poids: req.body.poids,
                 distance: req.body.distance
             });
        });
    });
});



