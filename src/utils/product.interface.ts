import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: string;
  quantity: number;
  ratings: number
}