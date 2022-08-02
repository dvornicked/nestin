import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'
import { Category } from '../page.model'

export class HhdataDto {
	@IsNumber()
	count: number

	@IsNumber()
	juniorSalary: number

	@IsNumber()
	middleSalary: number

	@IsNumber()
	seniorSalary: number
}

export class PageAdvantageDto {
	@IsString()
	title: string

	@IsString()
	description: string
}

export class createPageDto {
	@IsEnum(Category)
	сategory: Category

	@IsString()
	direction: string

	@IsString()
	alias: string

	@IsString()
	title: string

	@IsString()
	pageCategory: string

	@IsOptional()
	@ValidateNested()
	@Type(() => HhdataDto)
	hh?: HhdataDto

	@IsArray()
	@ValidateNested()
	@Type(() => PageAdvantageDto)
	advantages: PageAdvantageDto[]

	@IsString()
	seo: string

	@IsString()
	tagsTitle: string

	@IsArray()
	@IsString({ each: true })
	tags: string[]
}
