import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @GetUser() user: any) {
    return this.taskService.createTask(user.id, dto);
  }

  @Get()
  getAll(@GetUser() user: any) {
    return this.taskService.getTasks(user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: any,
  ) {
    return this.taskService.updateTask(user.id, id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: any) {
    return this.taskService.deleteTask(user.id, id);
  }
}
