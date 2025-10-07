import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produtos.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  // Busca tudo
  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find();
  }

  // Buscar por ID (findById)
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produto)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

    return produto;
  }

  // Buscar por Nome (findAllByNome)
  async findAllByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  // Criar
  async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  // Atualizar (update)
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id); // Verifica se o produto existe
    return await this.produtoRepository.save(produto);
  }

  // Apagar delete
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}
