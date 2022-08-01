import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductController } from './product.controller'
import { ProductSchema } from './product.model'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Product',
				schema: ProductSchema,
			},
		]),
	],
	controllers: [ProductController],
})
export class ProductModule {}
