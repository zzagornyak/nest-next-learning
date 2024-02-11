import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { Track } from '../../track/schemas/track.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
    @Prop()
    name: number;

    @Prop()
    autor: string;

    @Prop()
    picture: string;

    @Prop({ type: [{ type: Track }] })
    tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
