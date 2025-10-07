import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produtos/produtos.module';
import { Produto } from './produtos/entities/produtos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_quackpharm',
      entities: [Produto],
      synchronize: true,
      logging: true, //opcional
    }),

    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
