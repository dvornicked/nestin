import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { PageController } from './page.controller'
import { PageSchema } from './page.model'
import { PageService } from './page.service'

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{
				name: 'Page',
				schema: PageSchema,
			},
		]),
	],
	controllers: [PageController],
	providers: [PageService],
})
export class PageModule {}
