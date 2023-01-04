import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
    @Prop()
    hash: string;

    @Prop()
    prompt: string;

    @Prop({ default: false })
    urlSet: boolean;
}

export const ImageSchema = SchemaFactory.createForClass(Image);