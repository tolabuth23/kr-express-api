import {DEALER, KILOGRAM, USER} from "src/constants";
import {ImportRate} from "../interfaces/importRate.interface";
import {StatusEnum} from "../enum/status.enum";


export const importRateInitData: ImportRate[] = [
    {
        name: 'สินค้าทั่วไป',
        value: {
            [USER] : [
                {
                    min: 0,
                    max: 50,
                    rate: 250,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 300,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 350,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 450,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 250,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 300,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 350,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 450,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'สินค้ามือสองใช้แล้ว-โมเดล ฟิกเกอร์-เสื้อผ้ามือสอง(ไม่แบรนด์เนม)',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 180,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 200,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 220,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 240,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 180,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 200,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 220,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 240,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'เครื่องสำอางค์-อาหารเสริม-ขนม-สินค้าสุขภาพ-อะไหล่รถยนต์-มอเตอร์ไซค์-เครื่องดนตรี',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 260,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 270,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 280,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 290,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 260,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 270,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 280,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 290,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'ล้อแม็ก + ยาง (เส้น)',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 1400,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 1800,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 2000,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 2500,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 1400,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 1800,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 2000,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 2500,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'ล้อแม็ก + ยาง (เซ็ต)',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 5000,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 5000,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 10000,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 20000,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 5000,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 5000,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 10000,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 20000,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'จักรยานมือ 1 แบรนด์เนม',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 2200,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 2500,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 2700,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 2900,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 2200,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 2500,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 2700,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 2900,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'จักรยานมือ 2',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 1250,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 1500,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 1750,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 3000,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 1250,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 1500,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 1750,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 3000,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
    {
        name: 'สินค้าแบรนด์เนม เสื้อผ้า กระเป๋า รองเท้า',
        value: {
            [USER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 450,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 550,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 600,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 700,
                    type: KILOGRAM,
                },
            ],
            [DEALER]: [
                {
                    min: 0,
                    max: 50,
                    rate: 450,
                    type: KILOGRAM,
                },
                {
                    min: 51,
                    max: 99,
                    rate: 550,
                    type: KILOGRAM,
                },
                {
                    min: 100,
                    max: 199,
                    rate: 600,
                    type: KILOGRAM,
                }, {
                    min: 200,
                    max: null,
                    rate: 700,
                    type: KILOGRAM,
                },
            ],
        },
        status: StatusEnum.ACTIVE,
    },
]
