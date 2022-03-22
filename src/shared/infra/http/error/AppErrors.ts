export class AppErrors {

    public readonly message: string;
    public readonly statusCode: number;
    
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    };
};
// essa parte será inserida em todo nosso código