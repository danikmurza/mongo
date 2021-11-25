import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @Post('/addUser')
  async addVehicle(@Body() body: CreateUserDto) {
    const user = await this.userService.add(body);
    return user;
  }
}
