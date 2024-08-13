import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(errors: any) {
    super(
      {
        message: 'Erro de validação',
        errors: formatErrors(errors),
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

function formatErrors(errors: any[]) {
  return errors.map((error) => ({
    property: error.property,
    constraints: error.constraints,
  }));
}
