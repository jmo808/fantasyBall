module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.', req.body);
  context.bindings.cuSbQueue = JSON.stringify({
    id: req.body.id,
    partitionKey: new String(context.bindingData.partitionKey),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    total: req.body.total,
    roster: {
      player1: {
        name: req.body.roster.player1.name,
        score: req.body.roster.player1.score
      },
      player2: {
        name: req.body.roster.player2.name,
        score: req.body.roster.player2.score
      },
      player3: {
        name: req.body.roster.player3.name,
        score: req.body.roster.player3.score
      }
    }
  });
  context.res = { body : "Request submitted to Queue"};
};
