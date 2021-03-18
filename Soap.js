const { request } = require('http');
var soap = require('soap');
var app = require('express')();

var soapService = 
{
    serviceCout: 
    {
        prixTotal: 
        {
            coutLivraison: function (args)
            {
                let prixByPoids = 0.33;
                let prixByDistance = 1.33;
                
                let prixPoids = args.poids * prixByPoids + args.prix/2;
                let prixDist = args.distance * prixByDistance + args.prix/2;
                
                let prixSansFrais = (prixPoids + prixDist);
                let prixTot = prixSansFrais * 1.33;
                console.log(prixPoids);
                console.log(prixDist);
                console.log(prixSansFrais);
                console.log(prixTot);
                return {
                    prixPoid: prixPoids,
                    prixDist: prixDist,
                    prixSansFrais: prixSansFrais,
                    prixTotal: prixTot
                };
            }
        }
    }
};

var xml = require("fs").readFileSync("serveur.wsdl", "utf8");

let port = process.env.PORT || 5000;

app.listen( port , function()
{
    soap.listen(app, '/wsdl', soapService, xml, function (){
        console.log(`port Soap :${port}`);
    });
}
);