import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';

@Controller('albums')
@ApiTags('Albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    create() {
        return this.albumService.create();
    }

    @Get()
    getAll() {
        return this.albumService.getAll();
    }

    @Get(':id')
    getOne() {
        return this.albumService.getOne();
    }

    @Delete()
    delete() {
        return this.albumService.delete();
    }
}
