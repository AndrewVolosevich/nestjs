import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, SetMetadata, UseGuards, ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { CatInterface } from './interfaces/cat.interface';
import { ValidationCatPipe } from './validation-cat.pipe';
import { RolesGuard } from './roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('api/cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<CatInterface[]> {
    return this.catsService.findAll()
  }

  @Get(':id')
  getById(@Param('id') id:number): string {
    console.log(id);
    return `Cat #${id}`;
  }

  @Post()
  @Roles('admin')
  async create(
    @Body(new ValidationCatPipe()) createCatDto: CreateCatDto
  ) {
    return this.catsService.create(createCatDto)
  }

  @Put(':id')
  update(@Param() id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This section updates a ${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This section removes a ${id} cat`;
  }
}
