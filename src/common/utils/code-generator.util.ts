import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectCode } from '../interface/object-code.interface';

@Injectable()
export class CodeGeneratorUtil {
  static async generateCode<T extends ObjectCode>(
    model: Model<T>,
  ): Promise<number> {
    const lastRecord = await model.findOne({}).sort({ code: -1 }).exec();
    return lastRecord.code ? lastRecord.code + 1 : 1;
  }
}
