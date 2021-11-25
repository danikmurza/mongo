import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  Admin = 'admin',
  Client = 'client'
}

// Orders Schema
@Schema({})
export class OrdersData {

  @Prop()
  _id: string

  @Prop({ type: Date, required: true, default: Date.now })
  date!: Date;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  total!: number;
}

export const OrdersDataSchema = SchemaFactory.createForClass(OrdersData);

// Address Schema
@Schema({})
export class AddressData {

  @Prop()
  _id: string

  @Prop({ required: true })
  addressLine1!: string;

  @Prop({ required: false })
  addressLine2?: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  province!: string;

  @Prop({ required: true })
  country!: string;

  @Prop({ required: true })
  postalCode!: string;

}

export const AddressDataSchema = SchemaFactory.createForClass(AddressData);

@Schema({ collection: 'USERS' })
export class User {

  @Prop({ required: true, lowercase: true, unique: true,  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  firstName?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: false })
  image?: string;

  // @Prop({ required: true, enum: Object.values(Role) })
  // role?: Role;

  @Prop({ type: [AddressDataSchema] })
  address?: [] | AddressData[];

  @Prop({ type: [OrdersDataSchema] })
  orders?: [] | OrdersData[];

}

export const UserSchema = SchemaFactory.createForClass(User);
