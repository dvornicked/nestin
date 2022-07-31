export enum Category {
	Courses,
	Services,
	Books,
	Products,
}

export class PageModel {
	сategory: Category
	direction: string
	title: string
	pageCategory: string
	hh?: {
		count: number
		juniorSalary: number
		middleSalary: number
		seniorSalary: number
	}
	advantages: {
		title: string
		description: string
	}[]
	seo: string
	tagsTitle: string
	tags: string[]
}
