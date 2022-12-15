import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {goods} from "./goods.schema";
import { Request, Response } from 'express';
import {GoodsInterface} from "./interface/goods.interface";
import {nanoid} from "nanoid";
import { times } from 'lodash'
import QRCode from '../utils/QRCode'
import {CreateGoodsDTO} from "./dto/createGoods.dto";
import {GoodsDTO} from "./dto/goods.dto";
import {UsersService} from "../users/users.service";
import {RegisterGoodsDTO} from "./dto/registerGoods.dto";
import {CREATED, REGISTERED} from "../../constants";

@Injectable()
export class GoodsService {
    @InjectModel(goods.name)
    private readonly goodsModule: Model<GoodsInterface>
    private readonly userService: UsersService;

    async goodsCreate(req: Request, res: Response,newGoods: CreateGoodsDTO){
        const { amount,user } = newGoods;
        const goodsUserOwner  = { name: "arisak"};
        const promises = times(amount, async () => {
            const createData = ({
                ...GoodsDTO,
                user: goodsUserOwner,
                objectId: nanoid(),
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
        // const newGoods = await new this.goodsModule(goodsDto);
        // return newGoods.save();
    }
    async registerGoods(objectId: string,registerDto: RegisterGoodsDTO){
        //const user = this.userService.find
        const goods = this.goodsModule.findOne({objectId,status: {$in: [CREATED, REGISTERED]}}).select({qr: 0})
        // const originArrivedAt = goods


    }
}
