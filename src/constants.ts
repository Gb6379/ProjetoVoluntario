import { ApiResponseOptions } from "@nestjs/swagger";

export const ID_RESPONSE: ApiResponseOptions = {
    schema: { 
        title: 'IdResponse',
        properties: {
            id: {
                type: 'number'
            }
        } 
    }
};