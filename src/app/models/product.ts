export interface Product{
  productId:number ;
  cataloryId:number;
  productTypeId:number;
  collectionId:number;
  productName: string ;
  price:number;
  quanlity:number;
  quantityAvailable: number;
  sale:string;
  storageInstructions:string;
  colors:any[];
  sizes: any[];
  images: any[];
  categories:any[];
  collections:any[];
  descriptions:any[];

  sizeCurrent?:string;
  colorCurrent?:string;

}
