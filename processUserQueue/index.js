module.exports = async function(context, mySbMsg) {
  context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
  return JSON.stringify({
    id: mySbMsg.id,
    firstName: mySbMsg.firstName,
    lastName: mySbMsg.lastName,
    email: mySbMsg.email,
    address: {
      street: mySbMsg.street,
      city: mySbMsg.city,
      province: mySbMsg.province,
      postCode: mySbMsg.postCode,
      country: mySbMsg.country
    },
    roster: {
      player1: mySbMsg.player1,
      player2: mySbMsg.player2,
      player3: mySbMsg.player3
    },
    partitionKey: mySbMsg.partitionKey
  });
};
