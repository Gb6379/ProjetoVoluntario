import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export function checkHttpException(error: any, logger?: Logger) {
    if(error instanceof HttpException) {
      logger ? logger.error(error.getResponse()) : console.error(error.getResponse());

      throw error;
    }

    logger ? logger.error(error) : console.error(error);

    throw new HttpException({ reason: error }, HttpStatus.INTERNAL_SERVER_ERROR);
}