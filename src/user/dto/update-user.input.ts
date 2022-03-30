import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: `Campo de nome vazio. Por favor, digite seu nome` })
  @IsOptional()
  name?: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({
    message: `Campo de e-mail vazio. Por favor, digite seu e-mail`,
  })
  @IsOptional()
  email?: string;
}
