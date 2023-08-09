import { User } from "./interface-user";

export interface Image {
  readonly id?: number;
  readonly base64?: string;
  nameImage?: string;
}

export interface Visible {
  visibleImage?: boolean;
  visibleReceipts?: boolean;
}

export interface Receipt {
  readonly id?: number;
  storeName?: string;
  NIP?: string;
  dateOfPurchase?: string;
  totalPrice?: number;
  userId?: User;
  imageId?: Image;
}

export interface Product {
  readonly id?: number;
  name?: string;
  quantity?: number;
  price?: number;
  productTotalPrice?: number;
  receiptId?: Receipt;
}

export interface ClickPosition {
  readonly x?: number;
  readonly y?: number;
}

export class Point {
  public x = 0;
  public y = 0;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Word {
  public value: string = '';
  public pointMin: Point = new Point(0, 0);
  public pointMax: Point = new Point(0, 0);

  constructor(value: string, min: Point, max: Point) {
    this.value = value;
    this.pointMin = min;
    this.pointMax = max;
  }

  isIn(point: Point): boolean {
    if (point.x >= this.pointMin.x && point.x <= this.pointMax.x && point.y >= this.pointMin.y && point.y <= this.pointMax.y) {
      return true;
    };
    return false;
  }
}