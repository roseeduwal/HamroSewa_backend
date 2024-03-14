import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../../infra/firebase/FIrebase.Service';
import { ProductRepository } from './Product.Repository';
import { CreateProductDto } from './dto/CreateProductDto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(file: Express.Multer.File, createProductDto: CreateProductDto) {
    try {
      const imageUrl = await this.firebaseService.uploadFile(
        file,
        'product-images',
      );

      const newProduct = await this.productRepository.create({
        ...createProductDto,
        productImageUrl: imageUrl,
      });

      if (!newProduct) throw new HttpException('Something went wrong', 500);

      return newProduct;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchAll() {
    try {
      const products = await this.productRepository.findAll();

      if (!products) throw new NotFoundException();

      return products;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
