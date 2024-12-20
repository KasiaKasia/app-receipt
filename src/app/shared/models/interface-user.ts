export interface User {

    userid?: string;
    username?: string;
    password?: string;
    description?: string;
    email?: string;
    address?: Address;
    type?: UserType;
    categories?: string[];
  }
  
  export interface Address {
  
    street?: string;
    houseNumber?: number;
    city?: string;
  }
  
  export enum UserType {
  
    Standard,
    Premium,
    VIP,
    Admin,
  }

  export interface Session {
    success?: boolean;
    code?: number;
    message?: string;
    respons?: User; 
  }