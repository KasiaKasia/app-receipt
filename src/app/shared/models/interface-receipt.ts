import { User } from "./interface-user";

export interface Receipt {
  id?: number;
  storeName?: string;
  nip?: string;
  dateOfPurchase?: string;
  totalPrice?: number;
  userId?: User;
 }

export interface Product {
  id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  receiptId: Receipt;
}

export interface ClickPosition {
  x?: number;
  y?: number;
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