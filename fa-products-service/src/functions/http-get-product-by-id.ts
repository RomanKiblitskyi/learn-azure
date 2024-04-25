import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import mockedProductList from '../mockedData/products'

export async function httpGetProductById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    return { jsonBody: mockedProductList.filter(({ id }) => id == request.params.productId)[0] || {} };
};

app.http('http-get-product-by-id', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{productId}',
    handler: httpGetProductById
});