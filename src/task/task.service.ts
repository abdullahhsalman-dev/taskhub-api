import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  createTask(userId: number, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        userId,
      },
    });
  }

  getTasks(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateTask(userId: number, taskId: number, dto: UpdateTaskDto) {
    return this.prisma.task.updateMany({
      where: { id: taskId, userId },
      data: dto,
    });
  }

  deleteTask(userId: number, taskId: number) {
    return this.prisma.task.deleteMany({
      where: { id: taskId, userId },
    });
  }
}
