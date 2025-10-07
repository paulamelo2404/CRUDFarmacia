import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produtos.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 1000, nullable: true })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
