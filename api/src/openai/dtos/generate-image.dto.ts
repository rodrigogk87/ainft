import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GenerateImageDto {
    @ApiProperty()
    @IsNotEmpty()
    class: string;

    @ApiProperty()
    @IsNotEmpty()
    eyes: string;

    @ApiProperty()
    @IsNotEmpty()
    hair: string;
}