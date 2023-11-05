import { Controller, Get, Post } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';

@Controller(`authorize`)
export class AuthorizeController {
    constructor(private readonly authorizeService: AuthorizeService) {}

    @Get()
    authorizeGet() {
        //
    }

    @Post()
    authorizePost() {
        //
    }
}
