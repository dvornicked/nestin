import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { createPageDto } from './dto/createPage.dto'
import { Category, PageDocument } from './page.model'

@Injectable()
export class PageService {
	constructor(
		@InjectModel('Page') private readonly pageModel: Model<PageDocument>,
	) {}

	async create(dto: createPageDto) {
		return this.pageModel.create(dto)
	}

	async findById(id: string) {
		return this.pageModel.findById(id).exec()
	}

	async findByAlias(alias: string) {
		return this.pageModel.findById({ alias }).exec()
	}

	async deleteById(id: string) {
		return this.pageModel.findByIdAndRemove(id).exec()
	}

	async updateById(id: string, dto: createPageDto) {
		return this.pageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findByCategory(category: Category) {
		return this.pageModel
			.findById({ category }, { alias: 1, direction: 1, title: 1 })
			.exec()
	}
}
