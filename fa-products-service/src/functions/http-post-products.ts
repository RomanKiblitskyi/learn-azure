import { app, InvocationContext, HttpResponseInit, HttpRequest, HttpRequestInit, HttpRequestBodyInit } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import { DATABASE_ID, CONTAINER_ID } from "../constants";

const httpPostProducts = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
        const endpoint = process.env.COSMOS_DB_ENDPOINT;
        const key = process.env.COSMOS_DB_KEY
        const databaseId = DATABASE_ID;
        const containerId = CONTAINER_ID;

        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);

        context.log(request.params)

        const items = await request.json()
        context.log(items, 'request.body')

        const { resource: createdItem } = await container.items.create(items)

        return {
            jsonBody: createdItem,
        }
    } catch (error) {
        context.error(error.message)
        return {
            status: 400,
            jsonBody: {
                message: error.message
            }
        }
    }
};

app.http('http-post-products', {
    methods: ['POST'],
    authLevel: 'function',
    handler: httpPostProducts
});