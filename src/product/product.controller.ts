import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { IdValidationPipe } from 'src/pipes/idValidation.pipe'
import { CreateProductDto } from './dto/createProduct.dto'
import { FindProductDto } from './dto/findProduct.dto'
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants'
import { ProductModel } from './product.model'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		this.productService.create(dto)
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = this.productService.findById(id)
		if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		return product
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = this.productService.deleteById(id)
		if (!deletedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, dto: ProductModel) {
		const updatedProduct = this.productService.updateById(id, dto)
		if (!updatedProduct) throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		return updatedProduct
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto)
	}
}
