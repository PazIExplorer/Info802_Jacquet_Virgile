# Info802_Jacquet_Virgile

il s'agit de la branche principal du projet
Le projet se compose de deux branches

branche 1:
  Service soap, séparé du reste du client web à cause d'un problème rencontré avec azure
  finalement passé sur heroku, les services sont resté séparé dans le dout
  
branche 2:
  Client web, contenant l'appel au service soap et l'appel a l'api rest, graphQL n'a pas été abordé pour plusieurs raisons, en local un debut peu fonctionnel a été fait      mais n'est pas utilisable
  l'api rest est celle de Stripe, la raison de son utilisation est :
      -sa simplicité par rapport a mangopay qui est vraiment nulle
      -pas de nom d'entreprise a rentré pas de code bizarre a trouver
      -fait exactement le meme job 
