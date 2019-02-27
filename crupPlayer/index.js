module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.', req.body);
  var totalScore = (req.body.single + (req.body.double*2) + (req.body.triple*3) + (req.body.hr*4)) - req.body.so
  context.bindings.cuSbQueue = JSON.stringify({
    id : context.bindingData.id,
    partitionKey : new String(context.bindingData.partitionKey),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    team: req.body.team,
    single: req.body.single,
    double: req.body.double,
    triple: req.body.triple,
    hr: req.body.hr,
    so: req.body.so,
    total: totalScore
    });
  context.res = { body : "Request submitted to Queue"};
};
