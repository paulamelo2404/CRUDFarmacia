import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Produto } from '../entities/produtos.entity';
import { ProdutoService } from '../services/produtos.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('busca/nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Query('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id).then(() => {});
  }
}
