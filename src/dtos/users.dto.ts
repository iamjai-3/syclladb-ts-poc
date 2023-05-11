import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;
  @IsBoolean()
  public isAdmin: boolean;
}

export class UpdateUserDto {
  @IsBoolean()
  public isAdmin: boolean;
}
