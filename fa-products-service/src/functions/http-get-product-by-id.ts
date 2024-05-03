import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { PRODUCTS_DB, PRODUCTS_CONTAINER, STOCKS_CONTAINER } from "../constants";
import { getDoc } from "../helpers/getDoc";

export async function httpGetProductById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    context.log('Incoming request from: ', request.url)

    const productsContainer = getDoc(PRODUCTS_DB, PRODUCTS_CONTAINER)
    const stocksContainer = getDoc(PRODUCTS_DB, STOCKS_CONTAINER)

    context.log('REQUEST ID:', request.params.productId)
    const QUERY = `SELECT * FROM p WHERE p.id='${request.params.productId}'`

    const products = await productsContainer.items.query(QUERY).fetchAll()
    const { resources: stocks } = await stocksContainer.items.readAll().fetchAll()

    const { id, title, description, price, } = products.resources[0]

    const res = {
        id, title, description, price,
        count: stocks.find(stock => stock.productId === id)?.count ?? 0
    }

    return {
        jsonBody: res,
    }
};

app.http('http-get-product-by-id', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'products/{productId:guid}',
    handler: httpGetProductById
});