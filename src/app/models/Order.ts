export interface Order {
  userId: number;
  orderDate: string;
  totalPrice: number | string;
  status?: string;
  paymentMethod?: string;
}
