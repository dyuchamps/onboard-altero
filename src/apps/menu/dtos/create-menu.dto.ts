import { IsNumber, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  id: string;
  name: string;
  description: string;

  @IsNumber()
  price: number;
}
