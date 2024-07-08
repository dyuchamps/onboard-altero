import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ResponseBodyDTO_Menu {
  @IsString()
  id: string;
  name: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;

  @IsDate()
  createdAt: Date;
  updatedAt: Date;
}

export class RequestBodyDTO_CreateMenu {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  description: string;
}

export class RequestBodyDTO_UpdateMenu {
  @IsOptional()
  @IsString()
  name: string;
  price: number;

  @IsOptional()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  description: string;
}
