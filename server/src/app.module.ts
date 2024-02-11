import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AlbumModule } from './album/album.module';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DB_URI),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
            // serveRoot: '/public/',
        }),
        TrackModule,
        AlbumModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
