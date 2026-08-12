export type OrderStatus = "PENDING" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

export interface TacosComposition {
  size: "SIMPLE" | "DOUBLE" | "XL";
  meats: string[];
  sauces: string[];
  extras: string[];
  sauceFromagere: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  type: "TACOS_CUSTOM" | "STANDARD";
  price: number;
  quantity: number;
  details?: string;
  tacosComposition?: TacosComposition;
}

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  notes?: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
