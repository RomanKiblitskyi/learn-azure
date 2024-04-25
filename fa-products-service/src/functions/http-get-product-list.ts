import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import mockedProductList from '../mockedData/products'

export async function httpGetProductList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    return {
        jsonBody: mockedProductList,
    }
};

app.http('http-get-product-list', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products',
    handler: httpGetProductList
});