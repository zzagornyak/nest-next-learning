import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ObjectId } from 'mongoose';

import { FileType } from '../file/file.service';
import { FileService } from '../file/file.service';

import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private FileService: FileService,
    ) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.FileService.create(FileType.AUDIO, audio);
        const picturePath = this.FileService.create(FileType.IMAGE, picture);
        const track = await this.trackModel.create({
            ...dto,
            listens: 0,
            audio: audioPath,
            picture: picturePath,
        });
        return track;
    }

    async findAll(count: number = 10, offset: number = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(offset).limit(count);
        return tracks;
    }

    async findOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async remove(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, 'i') },
        });
        return tracks;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({ ...dto });
        track.comments.push(comment._id);
        await track.save();
        return comment;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }
}
