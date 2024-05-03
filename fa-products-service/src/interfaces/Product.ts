import Stock from "./Stocks";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}
export default Product

export type ProductDTO = Product & Pick<Stock, 'count'>
