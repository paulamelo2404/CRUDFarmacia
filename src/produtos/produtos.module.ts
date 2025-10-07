import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produtos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProdutoModule {}
