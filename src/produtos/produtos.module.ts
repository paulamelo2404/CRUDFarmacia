import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produtos.entity';
import { ProdutoService } from './services/produtos.service';
import { ProdutoController } from './controllers/produdos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
