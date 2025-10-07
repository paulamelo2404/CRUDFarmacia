import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produtos/entities/produtos.entity';
import { ProdutoModule } from './produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_quackpharm',
      entities: [Produto, Categoria],
      synchronize: true,
      logging: true, //opcional
    }),

    ProdutoModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
