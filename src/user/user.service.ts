import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: {
      id,
    }});

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new BadRequestException('Erro ao cadastrar usuário');
    }

    return userSaved;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findById(id);
    await this.userRepository.update(user, {...data});

    const userUpdated: User = {...user, ...data};
    return userUpdated;
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);
    const userDeleted = await this.userRepository.delete(id);

    if (!userDeleted) {
      return false;
    }

    return true;
  }
}
