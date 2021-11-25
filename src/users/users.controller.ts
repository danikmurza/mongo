import {Body, Controller, Delete, Get, NotFoundException, Patch, Post} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserDto, UserDtoId} from "./dtos/user.dto";

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/user')
  async findUser(@Body() body: UserDtoId) {
   const user = await this.userService.findOne(body._id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Post('/add')
  async addUser(@Body() body: CreateUserDto) {
    const user = await this.userService.add(body);
    return user;
  }

  @Patch('/update')
  async addVehicle(@Body() body: UpdateUserDto) {
    const user = await this.userService.update(body._id, body);
    return user;
  }

  @Delete('/delete')
  async delete(@Body() body: UserDtoId) {
    const user = await this.userService.remove(body._id);
    return user;
  }
}
