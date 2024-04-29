import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { PRODUCTS_DB, PRODUCTS_CONTAINER } from "../constants";
import { getDoc } from "../helpers/getDoc";

export async function httpGetProductsTotal(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const products_db = getDoc(PRODUCTS_DB, PRODUCTS_CONTAINER)

    const products = await products_db.items.readAll().fetchAll()

    const total = products.resources.length
    return {
        jsonBody: {
            total
        }
    }
};

app.http('http-get-products-total', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/total',
    handler: httpGetProductsTotal
});
