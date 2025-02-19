export interface ICategory {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface IProduct {
    id: number;
    category: ICategory;
    name: string;
    description?: string;
    price: number;
    stock: number;
    main_image?: IProductImage;
    images?: IProductImage[];
  }
  
  export interface IProductImage {
    id: number;
    product: IProduct;
    image: string;
  }
  
  export interface ICart {
    id: number;
    user: number; // ID пользователя
    created_at: string;
    items: ICartItem[];
  }
  
  export interface ICartItem {
    id: number;
    product: IProduct;
    quantity: number;
    price: number;
  }
  
  export interface IOrder {
    id: number;
    user: number; // ID пользователя
    created_at: string;
    status: 'pending' | 'completed' | 'cancelled';
    items: IOrderItem[];
  }
  
  export interface IOrderItem {
    id: number;
    product: IProduct;
    quantity: number;
    price: number;
  }

  export interface IUser { //django.contrib.auth.models.User
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  }