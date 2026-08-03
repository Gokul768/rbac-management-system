import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type AuditDocument =
  HydratedDocument<Audit>;

@Schema({
  timestamps: true,
})
export class Audit {
  @Prop({
    required: true,
  })
  user!: string;

  @Prop({
    required: true,
  })
  action!: string;

  @Prop({
    required: true,
  })
  resource!: string;
}

export const AuditSchema =
  SchemaFactory.createForClass(Audit);