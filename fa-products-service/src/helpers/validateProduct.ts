import { ProductDTO } from "../interfaces/Product";

export const validateProduct = (product: ProductDTO) => {
    const { title, description, price, count } = product
    const keys = Object.keys(product)

    if (!keys.includes('title')) throw { message: 'Title is required.' }
    if (!keys.includes('description')) throw { message: 'Description is required.' }
    if (!keys.includes('price')) throw { message: 'Price is required.' }
    if (!keys.includes('count')) throw { message: 'Count is required.' }
    if (keys.length > 4) throw { message: 'Unknown fields in body.' }



    if (!title.trim()) throw { message: 'Invalid title.' }
    if (!description.trim()) throw { message: 'Invalid description.' }
    if (isNaN(price) || typeof price !== 'number' || price < 0) throw { message: 'Invalid price.' }
    if (isNaN(count) || typeof count !== 'number' || count < 0) throw { message: 'Invalid count.' }
}