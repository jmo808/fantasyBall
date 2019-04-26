module.exports = async function (context, documents) {
    const CosmosClient = require('@azure/cosmos').CosmosClient;
    const databaseId = 'SPN';
    const containerId = 'players';
    const containerUser = 'users';
    let splits = process.env[cosmosDbConnectionString].split(";")
    let endpoint = splits[0].split("AccountEndpoint=")[1];
    let masterKey = splits[1].split("AccountKey=")[1];
    const client = new CosmosClient({ endpoint , auth: { masterKey } });
    context.log(documents);
    for (let doc of documents) {
        const querySpec = { 
            query: "SELECT * FROM c WHERE c.roster.player2.name = @player1 OR c.roster.player1.name = @player1 OR c.roster.player3.name = @player1",
            parameters: [
                {
                    name: "@player1",
                    value: doc.id
                }
            ]
        };
        const options = {
            partitionKey: "1"
        };
        const messages = [];
        const { result: results } = await client.database(databaseId)
            .container(containerUser)
            .items.query(querySpec, options)
            .toArray();
        for (let queryResult of results) {
            if (queryResult.roster.player1.name == doc.id) {
                queryResult.roster.player1.score = doc.total;
                context.log(queryResult);
            }
            if (queryResult.roster.player2.name == doc.id) {
                queryResult.roster.player2.score = doc.total;
                context.log(queryResult);
            }
            if (queryResult.roster.player3.name == doc.id) {
                queryResult.roster.player3.score = doc.total;
                context.log(queryResult);
            }
            queryResult.total = queryResult.roster.player1.score + queryResult.roster.player2.score + queryResult.roster.player3.score
            messages.push(queryResult);
        }
        context.bindings.cuSbQueue = messages;
    }
}