import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ 
    required: true,
    select: false, // password will not return in normal queries
  })
  password!: string;

  @Prop({
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role!: UserRole;

  @Prop({ default: true })
  status!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);