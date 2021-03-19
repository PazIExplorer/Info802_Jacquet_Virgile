const port = process.env.PORT || 3000;
const cleSecret = "sk_test_51IWLJZI6Zz8My46gGhI1sbowiw2TzTUUBjSPioIxFjdP7BOaaTwz2tELnSCtc5KZki4IcNlUZg7p0QkQ3pqgB8Jo00H8UOXbqw"
const clePublic = "pk_test_51IWLJZI6Zz8My46gjMAzscBHYvVQEJRJRf9xrUWRpgLOLSfoPLf2cUGjUwuE7NeEPqdXp2BuHRX0BnNL0NqMPsT30044cgXfZJ"

const { request } = require('http');
const bodyParser = require('body-parser')
const express = require('express')

const app = express();
const soap = require('soap');
const stripe = require("stripe")(cleSecret);

app.listen( port , function(){console.log(`client sur le port :${port}`)});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require("express").urlencoded());

app.set("view engine", "ejs");

app.get('/',function(req,res){
    res.render("vue");
});

app.post("/cost", function(req, res)
{
    var url = 'https://info802-soap-service.herokuapp.com/wsdl?wsdl'; 
    var args = { poids: req.body.poids, distance: req.body.distance, prix: req.body.prix };
    soap.createClient(url, function (err, client) {
        client.coutLivraison(args, function (err, result, raw) {
            res.render("renduCoutTotal",{
                 stripePublicKey : clePublic,
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



app.post('/transaction', function(req, res)
{
    console.log(`req body : ${JSON.stringify(req.body)}`);
        if (req.body == null) {
          res.status(500).end();
          console.log("erreur");
        } else {
          stripe.charges.create({
            amount: prixTotal,
            source: req.body.stripeTokenId,
            currency: 'eur'
          }).then(function() {
            console.log('Charge Successful')
            res.json({ message: 'Demande recu avec succes' })
            res.status(200).end()
          }).catch(function() {
            console.error('Charge Fail');
            res.status(500).end()
          });
        }
});
