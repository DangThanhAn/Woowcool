export interface Product {
  productID:number ;
  productName: string ;
  price:number;
  color:string[];
  size: string[];
  imgUrl: string[];
  sale:string;
  description:string;
  quanlityAvailable: number;
  cataloryID:string;
  sizeCurrent?:string;
  colorCurrent?:string;
  quanlity?:number;
}
