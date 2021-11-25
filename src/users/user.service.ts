import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import {UpdateUserDto} from "./dtos/update-user.dto";
import {UserDtoId} from "./dtos/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // fetch all users
  async findAll() {
    return this.userModel.find().exec();
  }

  // find by id
  async findOne(_id: string) {
    if (!_id) {
      return null;
    }

    return await this.userModel.findOne({ _id }).exec();
  }

  // Delete User
  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    console.log(id);
    return await this.userModel.deleteOne({ _id: id }).exec();
  }

  //Add User
  async add(data: CreateUserDto) {
    const userList = await this.userModel.find({ email: data.email }).exec();

    if (userList.length) {
      throw new BadRequestException(
        `${data.email} has already been registered`,
      );
    }

    const newUser = new this.userModel(data);
    return newUser.save();
  }


  //Update
  async update(_id: string, attrs: Partial<CreateUserDto> ) {
    const user: User = await this.findOne(_id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, {attrs})

    console.log(user)
    const createUser = new this.userModel(user)
    return createUser.save()
  }
}
