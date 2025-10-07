import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
}
