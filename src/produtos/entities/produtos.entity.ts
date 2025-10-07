import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;

  //Relacionamento Many-to-One: Muitos Produtos têm Uma Categoria
  //@ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
  //  onDelete: 'CASCADE', // Opcional: define o comportamento de exclusão
  //  })
  //  @JoinColumn({ name: 'categoria_id' })
  //  categoria: Categoria;
}
