import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId')
  deleteUser(@Param('userId', new ParseUUIDPipe()) id: string) {
    return this.usersService.removeUser(id);
  }
}
