module.exports = async function(context, mySbMsg) {
  context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
  return mySbMsg;
  /*
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
      player1: {
        name: mySbMsg.roster.player1.name,
        score: mySbMsg.roster.player1.score
      },
      player2: {
        name: mySbMsg.roster.player2.name,
        score: mySbMsg.roster.player2.score
      },
      player3: {
        name: mySbMsg.roster.player3.name,
        score: mySbMsg.roster.player3.score
      }
    },
    partitionKey: mySbMsg.partitionKey
  });*/
};
