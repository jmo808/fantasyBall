module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.', req.body);
  const CosmosClient = require('@azure/cosmos').CosmosClient;
  const databaseId = 'SPN';
  const containerId = 'players';
  var splits = process.env.cosmosDbConnectionString.split(";")
  var endpoint = splits[0].split("AccountEndpoint=")[1];
  var masterKey = splits[1].split("AccountKey=")[1];
  const client = new CosmosClient({ endpoint , auth: { masterKey } });
  await client.database(databaseId).container(containerId).item(context.bindingData.id).delete({ partitionKey: context.bindingData.partitionKey});
  context.log(`Deleted item: ${context.bindingData.id}\n`);
};
