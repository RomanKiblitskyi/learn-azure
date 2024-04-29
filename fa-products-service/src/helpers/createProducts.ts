import { faker } from '@faker-js/faker';
import { ProductDTO } from '../interfaces/Product';

export function createRandomProducts(): ProductDTO {
    return {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        count: faker.number.int({ max: 100 })
    };
}