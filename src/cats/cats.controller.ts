import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { CatInterface } from './interfaces/cat.interface';

@Controller('api/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<CatInterface[]> {
    return this.catsService.findAll()
  }

  @Get(':id')
  getById(@Param() params): string {
    console.log(params.id);
    return `Cat #${params.id}`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
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
