export interface Product{
  id:number ;
  categoryId:number;
  productTypeId:number;
  collectionId:number;
  productName: string ;
  price:number;
  quantity:number;
  quantityAvailable: number;
  sale:string;
  storageInstructions:string;
  colors:any[];
  sizes: any[];
  images: any[];

  category: any[];
  collection: any[];
  productType: any[];

  inventoryStatus?: InventoryStatus;
  sizeCurrent?:string;
  colorCurrent?:string;
  quantityOrder?:number;
  sizeOrder?:string;

}
interface InventoryStatus {
  label: string;
  value: string;
}
 interface ProductType{
  productTypeId: number,
  productTypeName: string,
  describe: string,
  image: string
}
export interface Image{
  productId: number,
  imgUrl:string
}
