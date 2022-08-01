import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateReviewDto } from './dto/createReview.dto'
import { ReviewDocument, ReviewModel } from './review.model'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		return this.reviewModel.create(dto)
	}

	async delete(id: string): Promise<ReviewModel | null> {
		return this.reviewModel.findByIdAndDelete(id).exec()
	}

	async findByProductId(productId: string): Promise<ReviewModel[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) })
			.exec()
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel
			.deleteMany({
				productId: new Types.ObjectId(productId),
			})
			.exec()
	}
}
