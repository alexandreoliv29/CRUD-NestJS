import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: UserDto): Promise<UserDto> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUser(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async getAll(): Promise<UserDto[]> {
    return await this.userModel.find();
  }

  async updateUser(id: string, user: UserDto): Promise<UserDto> {
    const oldUser = await this.userModel.findByIdAndUpdate(id, user);
    return oldUser.save();
  }

  async deleteUser(id: string): Promise<UserDto> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
