module.exports = async function(context, mySbMsg) {
  context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
  return JSON.stringify({
    id: mySbMsg.id,
    firstName: mySbMsg.firstName,
    lastName: mySbMsg.lastName,
    team: mySbMsg.team,
    total: mySbMsg.total,
    stats: {
      single: mySbMsg.single,
      double: mySbMsg.double,
      triple: mySbMsg.triple,
      hr: mySbMsg.hr,
      out: mySbMsg.out,
      so: mySbMsg.so
    },
    partitionKey: mySbMsg.partitionKey,
  });
};
