import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return categoria;
  }

  async findAllByNome(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    // Verificar se já existe categoria com mesmo nome
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { nome: categoria.nome },
    });

    if (categoriaExistente)
      throw new HttpException(
        'Categoria com este nome já existe!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id); // Verifica se a categoria existe

    const categoriaExistente = await this.categoriaRepository.findOne({
      where: {
        nome: categoria.nome,
      },
    });

    if (categoriaExistente && categoriaExistente.id !== categoria.id)
      throw new HttpException(
        'Categoria com este nome já existe!',
        HttpStatus.BAD_REQUEST,
      );

    return await this.categoriaRepository.save(categoria);
  }

  a;
  async delete(id: number): Promise<DeleteResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const categoria = await this.findById(id); // Já valida se existe

    const categoriaComProdutos = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });

    if (
      categoriaComProdutos &&
      categoriaComProdutos.produtos &&
      categoriaComProdutos.produtos.length > 0
    ) {
      throw new HttpException(
        'Não é possível excluir categoria com produtos vinculados!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.categoriaRepository.delete(id);
  }
}
