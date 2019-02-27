module.exports = async function (context, req, userRecord) {
  context.log('JavaScript HTTP trigger function processed a request.');
  if (!userRecord) {
    context.log('User not Found!');
    context.log(context.bindingData.partitionKey);
    context.res = { body : 'User not Found!'};
  }
  else {
    context.log(userRecord);
    return userRecord;
  }
};
