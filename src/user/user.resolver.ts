import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor (private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.create(data);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput
  ): Promise<User> {
    const user = await this.userService.update(id, data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id') id: string,
  ): Promise<boolean> {
    const userIsDeleted = await this.userService.delete(id);
    return userIsDeleted;
  }
}
