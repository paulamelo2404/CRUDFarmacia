import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produtos.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  // Criar produto com validação de categoria
  async create(produto: Produto): Promise<Produto> {
    // Validar se a categoria existe
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    } else {
      throw new HttpException(
        'A Categoria é obrigatória!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.produtoRepository.save(produto);
  }

  //  Atualizar produto com validação de categoria
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id); // Verifica se o produto existe

    // Validar se a categoria existe
    if (produto.categoria) {
      await this.categoriaService.findById(produto.categoria.id);
    } else {
      throw new HttpException(
        'A Categoria é obrigatória!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.produtoRepository.save(produto);
  }

  // 6. Deletar produto
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Verifica se o produto existe
    return await this.produtoRepository.delete(id);
  }
}
