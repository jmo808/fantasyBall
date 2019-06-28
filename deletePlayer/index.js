module.exports = async function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const CosmosClient = require('@azure/cosmos').CosmosClient;
  const databaseId = "SPN";
  const containerId = "player";
  let splits = process.env["cosmosDbConnectionString"].split(";");
  let endpoint = splits[0].split("AccountEndpoint=")[1];
  let masterKey = splits[1].split("AccountKey=")[1];
  const client = new CosmosClient({ endpoint , auth: { masterKey } });
  const options = {
    partitionKey: '1'
  };
  try {
    const { item } = await client.database(databaseId)
      .container(containerId)
      .item(context.bindingData.id)
      .delete(options);
  } catch (err) {
    context.log(err)
    throw(err)
  }
  context.log(`Deleted item: ${context.bindingData.id}\n`);
};
