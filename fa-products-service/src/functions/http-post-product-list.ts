import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { createRandomProducts } from "../helpers/createProducts";
import { faker } from '@faker-js/faker';
import Stock from '../interfaces/Stocks';
import { PRODUCTS_CONTAINER, PRODUCTS_DB, STOCKS_CONTAINER } from "../constants";
import { getDoc } from "../helpers/getDoc";
import Product, { ProductDTO } from "../interfaces/Product";

export async function httpPostProductList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    context.log('Incoming request from: ', request.url)

    const generatedProducts: ProductDTO[] = faker.helpers.multiple(createRandomProducts, {
        count: 5,
    });

    const products_db = getDoc(PRODUCTS_DB, PRODUCTS_CONTAINER)
    const stocks_db = getDoc(PRODUCTS_DB, STOCKS_CONTAINER)

    try {

        generatedProducts.map(async (item: ProductDTO) => {
            const { resource: product_item } = await products_db.items.create<Product>({
                id: item.id,
                title: item.title,
                description: item.description,
                price: item.price
            })

            await stocks_db.items.create<Stock>({ productId: product_item.id, count: item.count })

        })

    } catch (error) {
        context.error(error.message)
        return {
            status: 400,
            jsonBody: {
                message: error.message
            }
        }
    }

    return {
        jsonBody: {
            message: 'Products successfully created!',
            products: generatedProducts
        }
    };
};

app.http('http-post-product-list', {
    methods: ['POST'],
    authLevel: 'function',
    handler: httpPostProductList
});
