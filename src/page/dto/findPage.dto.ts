import { IsEnum } from 'class-validator'
import { Category } from '../page.model'

export class FindPageDto {
	@IsEnum(Category)
	category: Category
}
