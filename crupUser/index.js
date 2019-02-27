module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.', req.body);
  context.bindings.cuSbQueue = JSON.stringify({
    id : context.bindingData.id,
    partitionKey : new String(context.bindingData.partitionKey),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email : req.body.email,
    street: req.body.street,
    city: req.body.street,
    province: req.body.state,
    postCode: req.body.postCode,
    country: req.body.country,
    player1 : req.body.player1,
    player2 : req.body.player2,
    player3 : req.body.player3
    });
  context.res = { body : "Request submitted to Queue"};
};
