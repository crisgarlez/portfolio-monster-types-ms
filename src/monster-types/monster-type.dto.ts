import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateMonsterTypeDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Monster type's name.",
    example: 'Poison',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Monster Type's key.",
    example: 'PO',
  })
  key: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  @ApiProperty({
    description: "Monster Type's incubation time (in minutes).",
    example: 5,
    minimum: 1,
    maximum: 10,
  })
  incubation_time: number;
}

export class UpdateMonsterTypeDto extends PartialType(CreateMonsterTypeDto) {
  @Exclude()
  code?: string;
}
