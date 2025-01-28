export class BaseException extends Error {
    constructor(
        public message: string,
        public status: number = 500
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super(message, 404);
    }
} 