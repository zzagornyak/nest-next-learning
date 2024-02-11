import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
    async create() {
        return 'Create album';
    }

    async getAll() {
        return 'Get all albums';
    }

    async getOne() {
        return 'Get one album';
    }

    async delete() {
        return 'Delete album';
    }
}
