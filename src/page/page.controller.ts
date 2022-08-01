import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FindPageDto } from './dto/findPage.dto'
import { PageModel } from './page.model'

@Controller('page')
export class PageController {
	constructor(private readonly configService: ConfigService) {}

	@Post('create')
	async create(@Body() dto: Omit<PageModel, '_id'>) {
		this.configService.get('MONGO_LOGIN')
	}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, dto: PageModel) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindPageDto) {}
}
