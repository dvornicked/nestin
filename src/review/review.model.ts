import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type ReviewDocument = ReviewModel & Document

@Schema()
export class ReviewModel {
	@Prop()
	name: string

	@Prop()
	title: string

	@Prop()
	description: string

	@Prop()
	ratin: number

	@Prop()
	productId: Types.ObjectId
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel)
