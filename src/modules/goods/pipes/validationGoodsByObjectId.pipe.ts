import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable, InternalServerErrorException,
    PipeTransform
} from "@nestjs/common";
import {GoodsService} from "../goods.service";
import {Goods, goodsDocument} from "../goods.schema";
import {LoggerService} from "../../logger/logger.service";

@Injectable()
export class ValidationGoodsByObjectId implements PipeTransform<string> {
    private readonly logger: LoggerService = new LoggerService(
        ValidationGoodsByObjectId.name,
    )
    constructor(private goodsService: GoodsService) {
    }
    async transform(goodsId: string, metadata: ArgumentMetadata): Promise<Goods>{ // Optional casting into ObjectId if wanted!
        let goods: Goods;
        try {
            goods = await this.goodsService.findGoodsByObjectId(goodsId);
        } catch (error) {
            this.logger.error(
                `catch on getRanchCertificateById: ${error.message ?? error}`,
            )
            throw new InternalServerErrorException({
                message: error.message ?? error,
            })
        }
        if (!goods) {
            this.logger.error(`Goods: ${goodsId} not found`)
            throw new BadRequestException({
                message: 'Goods not found',
            })
        }
        return goods
    };
}