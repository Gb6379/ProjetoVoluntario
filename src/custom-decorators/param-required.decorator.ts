import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const ParamRequired = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.query[data];

    if(!value) {
        throw new HttpException(`Param '${data}' is required.`, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
);