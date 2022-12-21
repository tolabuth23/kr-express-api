import {Injectable, OnModuleInit} from '@nestjs/common'
import {CreateImportRateDTO} from './dto/createImportRate.dto'
import {ACTIVE, DEALER, INACTIVE, KILOGRAM, USER} from '../../constants'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {ImportRate, importRateDocument} from './schemas/importRate.schema'
import {UpdateImportRateDTO} from './dto/updateImportRate.dto'
import {importRateInitData} from './init/importRate.init'
import shortid from 'shortid'

@Injectable()
export class ImportRateService implements OnModuleInit {
    constructor(
        @InjectModel(ImportRate.name)
        private readonly importRateModule: Model<importRateDocument>,
    ) {
    }

    async getImportRateByCategories(query: any, page: number, perPage: number) {
        const pCount = await this.importRateModule.count(query)
        const pRecord = await this.importRateModule
            .find(query)
            .select({
                name: 1,
                value: 1,
            })
            .skip((+page - 1) * +perPage)
            .limit(+perPage)
            .sort({createdAt: 1})

        return [pCount, pRecord]

    }

    async getImportRates() {
        const s = ''
        const page = 1
        const perPage = 0
        const query: any = {}
        if (s !== '') {
            query['$or'] = [
                {
                    title: new RegExp(`^${s}`, 'gi'),
                },
            ]
        }
        let sort: { createdAt: -1 }
        const pCount = await this.importRateModule.count(query)
        const pRecord = await this.importRateModule
            .find(query)
            .skip((page - 1) * +perPage)
            .limit(+perPage)
            .sort(sort)
            .lean()
        const payload = {
            page,
            perPage,
            pCount,
            pRecord,
        }
        return payload
    }

    async getOneImportRates(objectId: string): Promise<ImportRate | undefined> {
        return this.importRateModule.findOne({objectId}).lean()
    }

    async findImportRateByTypeName(
        typeName: string,
    ): Promise<ImportRate | undefined> {
        return this.importRateModule.findOne({typeName}).lean()
    }

    async createImportRates(newImportRate: CreateImportRateDTO) {
        const {typeName, w0, w1, w2, w3} = newImportRate
        const importRateValue = [
            {
                min: 0,
                max: 50,
                rate: w0,
                type: KILOGRAM,
            },
            {
                min: 51,
                max: 99,
                rate: w1,
                type: KILOGRAM,
            },
            {
                min: 100,
                max: 199,
                rate: w2,
                type: KILOGRAM,
            },
            {
                min: 200,
                max: null,
                rate: w3,
                type: KILOGRAM,
            },
        ]
        const createCreateObject = {
            name: typeName,
            value: {
                [USER]: importRateValue,
                [DEALER]: importRateValue,
            },
            status: ACTIVE,
        }

        return await this.importRateModule.create(createCreateObject)
    }

    async updateImportRates(objectId: string, updateImport: UpdateImportRateDTO) {
        const {typeName, w0, w1, w2, w3} = updateImport
        const newImportRateValue = [
            {
                min: 0,
                max: 50,
                rate: w0,
                type: KILOGRAM,
            },
            {
                min: 51,
                max: 99,
                rate: w1,
                type: KILOGRAM,
            },
            {
                min: 100,
                max: 199,
                rate: w2,
                type: KILOGRAM,
            },
            {
                min: 200,
                max: null,
                rate: w3,
                type: KILOGRAM,
            },
        ]

        const rateUpdateObject = {
            name: typeName,
            value: {
                [USER]: newImportRateValue,
                [DEALER]: newImportRateValue,
            },
        }
        return this.importRateModule.findOneAndUpdate(
            {objectId: objectId},
            rateUpdateObject,
        )
    }

    async deleteImportRates(objectId: string) {
        return this.importRateModule.findOneAndDelete({
            objectId: objectId,
            status: INACTIVE,
        })
    }

    async onModuleInit() {
        const importRates = await this.importRateModule.count()
        if (!importRates) {
            for (const importRate of importRateInitData) {
                const newImportRate = new this.importRateModule({
                    objectId: shortid.generate(),
                    name: importRate.name,
                    status: importRate.status,
                    value: importRate.value,
                })
                await newImportRate.save()
            }
        }
    }
}
