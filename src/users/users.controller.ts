import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  getUser(@Param('userId', new ParseUUIDPipe()) id: string) {
    return this.usersService.findUsers(id);
  }

  @Get('/')
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Post('/')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId')
  deleteUser(@Param('userId', new ParseUUIDPipe()) id: string) {
    return this.usersService.removeUser(id);
  }
}
