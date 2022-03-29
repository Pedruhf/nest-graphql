import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: `Campo de nome vazio. Por favor, digite seu nome` })
  name: string;

  @IsEmail()
  @IsNotEmpty({
    message: `Campo de e-mail vazio. Por favor, digite seu e-mail`,
  })
  email: string;
}
