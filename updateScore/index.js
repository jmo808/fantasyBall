module.exports = async function (context, documents) {
    const CosmosClient = require('@azure/cosmos').CosmosClient;
    const databaseId = 'SPN';
    const containerId = 'players';
    let splits = process.env.cosmosDbConnectionString.split(";")
    let endpoint = splits[0].split("AccountEndpoint=")[1];
    let masterKey = splits[1].split("AccountKey=")[1];
    const client = new CosmosClient({ endpoint , auth: { masterKey } });
    const querySpec = { 
        query: "SELECT c.id, c.roster FROM c WHERE c.roster.player1 = " +documents[0].id +" OR c.roster.player2 = "+ documents[0].id + " OR r.roster.player3 = "+documents[0].id,
    };
    let results = await client.database(databaseId).container('users').items.query(querySpec);
    context.log(results.length);
    /*for (let doc of documents) {
        const querySpec = { 
            query: "SELECT c.id, c.roster FROM c WHERE c.roster.player1 = @playerid OR \
            c.roster.player2 = @playerid OR r.roster.player3 = @playerid",
            parameters: [
                {
                    name: "@playerid",
                    value: "doc.id"
                }
            ]
        };
        const { result: results } = await client.database(databaseId).container('users').items.query(querySpec).toArray();
        context.log(results[0])}
        for (let user of results) {
            user.roster['doc.id'].score = doc.total;
            user.total = 0;
            for (x = 1; x < 4; x++) {
                user.total += user.roster.player[x].score;
            };
            await client.database(databaseId).container('users').item(user.id).replace(user);
        };
    };*/
};
