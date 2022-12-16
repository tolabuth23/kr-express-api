import { Injectable } from '@nestjs/common'
import { ImportRateService } from '../importRate/importRate.service'

@Injectable()
export class CategoryService {
  constructor(private importRateService: ImportRateService) {}
  async getCategories() {
    const s = ''
    const page = 1
    const perPage = 20
    const query: any = {}
    if (s != '') {
      query.name = new RegExp(`${s}`, 'gi')
    }

    const [count, records] =
      await this.importRateService.getImportRateByCategories(
        query,
        page,
        perPage,
      )
    const payload = {
      page,
      perPage,
      count,
      records,
    }
    return payload
  }
}
