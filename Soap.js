const { request } = require('http');
var soap = require('soap');
var app = require('express')();

var soapService = 
{
    calculCout: 
    {
        prixLivre: 
        {
            coutLivraison: function (args)
            {
                let prixByPoids = 0.33;
                let prixByDistance = 1.33;
                
                let prixPoids = args.poids * prixByPoids;
                let prixDist = args.distance * prixByDistance;

                let prix = (prixPoids + prixDist) * 1.33;
                
                return {
                    prixLivraison: prix
                };
            }
        }
    }
};

var xml = require("fs").readFileSync("serveur.wsdl", "utf8");

let port = process.env.PORT || 3000;

app.listen( port , function()
{
    soap.listen(app, '/wsdl', soapService, xml, function (){
        app.listen( port , function(){console.log(`port Soap :${port}`)});
    });
}
);