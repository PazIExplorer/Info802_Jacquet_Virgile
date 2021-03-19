const { request } = require('http');

const express = require('express')
const app = express();

const soap = require('soap');
const port = process.env.PORT || 3000;
app.listen( port , function(){console.log(`client sur le port :${port}`)});

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(require("express").urlencoded());
app.get('/',function(req,res){
    res.render("vue");
});


const cleSecret = "sk_test_51IWLJZI6Zz8My46gGhI1sbowiw2TzTUUBjSPioIxFjdP7BOaaTwz2tELnSCtc5KZki4IcNlUZg7p0QkQ3pqgB8Jo00H8UOXbqw"
const clePublic = "pk_test_51IWLJZI6Zz8My46gjMAzscBHYvVQEJRJRf9xrUWRpgLOLSfoPLf2cUGjUwuE7NeEPqdXp2BuHRX0BnNL0NqMPsT30044cgXfZJ"
const stripe = require("stripe")(cleSecret);
app.use("/",express.static(__dirname));



app.post('/transaction', function(req, res)
{
      console.log("la on est dans transaction");
      console.log(req.body);
        if (req.body == null) {
          res.status(500).end();
          console.log("erreur");
          console.log(req.body.price);
          console.log(req.body.stripeTokenId);
        } else {
          stripe.charges.create({
            amount: req.body.price,
            source: req.body.stripeTokenId,
            currency: 'eur'
          }).then(function() {
            console.log('Charge Successful')
            res.json({ message: 'Merci pour votre achat' })
            res.status(200).end()
          }).catch(function() {
            console.error('Charge Fail');
            res.status(500).end()
          });
        }
});







app.post("/cost", function(req, res)
{
    var url = 'https://info802-soap-service.herokuapp.com/wsdl?wsdl'; 
    var args = { poids: req.body.poids, distance: req.body.distance, prix: req.body.prix };
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



