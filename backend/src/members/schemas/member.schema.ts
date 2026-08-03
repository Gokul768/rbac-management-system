import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema({
  timestamps: true,
})
export class Member {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  phone!: string;

  // ✅ ADD THIS
  @Prop({
    default: "Member",
  })
  role!: string;

  @Prop({
    default: true,
  })
  status!: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);