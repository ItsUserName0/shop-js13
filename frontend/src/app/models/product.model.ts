export class Product {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
  ) {}
}

export interface ProductData {
  [key: string]: any,
  title: string,
  price: number,
  description: string,
  image: File | null,
  category: string,
}

export interface ApiProductData {
  _id: string,
  title: string,
  price: number,
  description: string,
  image: string
}
