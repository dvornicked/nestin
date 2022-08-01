import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum Category {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number

	@Prop()
	juniorSalary: number

	@Prop()
	middleSalary: number

	@Prop()
	seniorSalary: number
}

export class PageAdvantage {
	@Prop()
	title: string

	@Prop()
	description: string
}

@Schema()
export class PageModel {
	@Prop({ enum: Category })
	сategory: Category

	@Prop()
	direction: string

	@Prop({ unique: true })
	alias: string

	@Prop()
	title: string

	@Prop()
	pageCategory: string

	@Prop({ type: () => HhData })
	hh?: HhData

	@Prop({ type: () => [PageAdvantage] })
	advantages: PageAdvantage[]

	@Prop()
	seo: string

	@Prop()
	tagsTitle: string

	@Prop()
	tags: string[]
}

export const PageSchema = SchemaFactory.createForClass(PageModel)
