import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable, InternalServerErrorException,
    PipeTransform
} from "@nestjs/common";
import {LoggerService} from "../../logger/logger.service";
import {GoodsService} from "../../goods/goods.service";
import {Goods} from "../../goods/goods.schema";
import {ImportRateService} from "../importRate.service";
import {CreateImportRateDTO} from "../dto/createImportRate.dto";
import {ImportRate} from "../schemas/importRate.schema";

@Injectable()
export class ValidationCreateImportRate implements PipeTransform<CreateImportRateDTO> {
    private readonly logger: LoggerService = new LoggerService(
        ValidationCreateImportRate.name,
    )
    constructor(private importRateService: ImportRateService) {
    }
    async transform(importRateDTO: CreateImportRateDTO, metadata: ArgumentMetadata): Promise<CreateImportRateDTO>{ // Optional casting into ObjectId if wanted!
        const { typeName } = importRateDTO;
        let importRate: ImportRate;
        try {
            importRate = await this.importRateService.findImportRateByTypeName(typeName);
        } catch (error) {
            this.logger.error(
                `catch on getRanchCertificateById: ${error.message ?? error}`,
            )
            throw new InternalServerErrorException({
                message: error.message ?? error,
            })
        }
        if (!importRate) {
            this.logger.error(`importRate: ${importRate} not found`)
            throw new BadRequestException({
                message: 'type name is already to use',
            })
        }
        return importRateDTO;
    };
}