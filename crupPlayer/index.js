module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.', req.body);
  var totalScore = (req.body.stats.single + (req.body.stats.double*2) + (req.body.stats.triple*3) + (req.body.stats.hr*4)) - req.body.stats.so
  context.bindings.cuSbQueue = JSON.stringify({
    id : context.bindingData.id,
    partitionKey : new String(context.bindingData.partitionKey),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    team: req.body.team,
    stats: {
      single: req.body.stats.single,
      double: req.body.stats.double,
      triple: req.body.stats.triple,
      hr: req.body.stats.hr,
      so: req.body.stats.so
    },
    total: totalScore
    });
  context.res = { body : "Request submitted to Queue"};
};
