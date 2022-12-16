import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Goods, goodsDocument} from "./goods.schema";
import { Request, Response } from 'express';
import {GoodsInterface} from "./interfaces/goods.interface";
import {nanoid} from "nanoid";
import { times } from 'lodash'
import QRCode from '../utils/QRCode'
import {CreateGoodsDTO} from "./dto/createGoods.dto";
import {GoodsDTO} from "./dto/goods.dto";
import {UsersService} from "../users/users.service";
import {RegisterGoodsDTO} from "./dto/registerGoods.dto";
import {CREATED, REGISTERED} from "../../constants";
import * as shortid from 'shortid'
import {InDestinationGoodsDTO} from "./dto/inDestinationGoods.dto";
import {LoggerService} from "../logger/logger.service";
@Injectable()
export class GoodsService {
    constructor(@InjectModel(Goods.name) private readonly goodsModule: Model<goodsDocument>,
    private userService: UsersService) {
    }
    private readonly logger: LoggerService = new LoggerService(
        GoodsService.name,
    )

    async goodsCreate(req: Request, res: Response,newGoods: CreateGoodsDTO){
        const { amount,user } = newGoods;
        let goodsUserOwner;
        try {
             goodsUserOwner  = await this.userService.findById(user);
        } catch (error) {
            this.logger.error(
                `catch on getRanchCertificateById: ${error.message ?? error}`,
            )
            throw new InternalServerErrorException({
                message: error.message ?? error,
            })
        }
        if (!goodsUserOwner) {
            this.logger.error(`User: ${user} not found`)
            throw new BadRequestException({
                message: 'User not found',
            })
        }

        const promises = times(amount, async () => {
            const createData = ({
                ...GoodsDTO,
                user: goodsUserOwner,
                objectId: shortid.generate(),
            })
            const qrCodeInstance = new QRCode({data : createData})
            const qr = await qrCodeInstance.getQR()

            return new Promise((resolve) => {
                resolve({
                    ...createData,
                    qr
                })
            })
        })
        const qrCode = await Promise.all(promises)
        return await this.goodsModule.create(qrCode)
    }
    async registerGoods(objectId: string,registerDto: RegisterGoodsDTO){
        const goodsUserOwner  = await this.userService.findById(objectId);
        const goods = this.goodsModule.findOne({objectId,status: {$in: [CREATED, REGISTERED]}}).select({qr: 0})
        // const originArrivedAt = goods
    }

    getOneGoods(goods: Goods){
      return this.goodsModule.findOne({goods}).populate('user', ['objectId', 'level', 'displayName']).lean();

    }

    inDestinationGoods(goods: Goods){

    }

    async findGoodsByObjectId(objectId:string): Promise<Goods>{
        return await this.goodsModule.findOne({objectId}).exec();
    }
}
