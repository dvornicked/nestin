import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type AuthDocument = AuthModel & Document

@Schema()
export class AuthModel {
	@Prop({ unique: true })
	email: string

	@Prop()
	passwordHash: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel)
