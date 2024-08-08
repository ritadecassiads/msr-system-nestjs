import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { WithCode } from './with-code.interface';

@Injectable()
export class CodeGeneratorUtil {
  static async generateCode<T extends WithCode>(
    model: Model<T>,
  ): Promise<number> {
    const lastRecord = await model.findOne({}).sort({ code: -1 }).exec();
    return lastRecord ? lastRecord.code + 1 : 1;
  }
}
