import { Controller, Get } from '@nestjs/common'
import { CategoryService } from '../category/category.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('currencies')
@ApiTags('currencies')
export class CurrenciesController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getCategories() {
    return this.categoryService.getCategories()
  }
}
