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
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard'
import { IdValidationPipe } from 'src/pipes/idValidation.pipe'
import { createPageDto } from './dto/createPage.dto'
import { FindPageDto } from './dto/findPage.dto'
import { NOT_FOUND_PAGE_ERROR } from './page.constants'
import { PageService } from './page.service'

@Controller('page')
export class PageController {
	constructor(private readonly pageService: PageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: createPageDto) {
		return this.pageService.create(dto)
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id)
		if (page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		return page
	}

	@Get('alias/:id')
	async getAlias(@Param('id') id: string) {
		const page = await this.pageService.findByAlias(id)
		if (page) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		return page
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.pageService.deleteById(id)
		if (deletedPage) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, dto: createPageDto) {
		const updatedPage = await this.pageService.updateById(id, dto)
		if (updatedPage) throw new NotFoundException(NOT_FOUND_PAGE_ERROR)
		return updatedPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindPageDto) {
		return this.pageService.findByCategory(dto.category)
	}
}
