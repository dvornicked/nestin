import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ReviewModel } from 'src/review/review.model'
import { CreateProductDto } from './dto/createProduct.dto'
import { ProductDocument, ProductModel } from './product.model'

@Injectable()
export class ProductService {
	constructor(
		@InjectModel('Product')
		private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto)
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec()
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec()
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findWithReviews(dto) {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
					},
				},
			])
			.exec() as Promise<
			ProductModel &
				{ review: ReviewModel[]; reviewCount: number; reviewAvg: number }[]
		>
	}
}
