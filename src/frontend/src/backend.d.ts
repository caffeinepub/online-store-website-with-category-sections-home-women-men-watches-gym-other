import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    title: string;
    imageLink: string;
    category: Category;
    price: bigint;
}
export enum Category {
    gym = "gym",
    men = "men",
    watches = "watches",
    other = "other",
    women = "women"
}
export interface backendInterface {
    filterProductsByCategory(category: Category): Promise<Array<Product>>;
    getProductById(id: bigint): Promise<Product>;
    listAllProducts(): Promise<Array<Product>>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
}
