import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const Required = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.body[data];

    if(!value) {
        throw new HttpException(`'${data}' is required.`, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
);