import {
  BadGatewayException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './Category.Repository';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const doesCategoryExist = await this.categoryRepository.findOneBy({
        categoryName: createCategoryDto.categoryName,
      });

      if (doesCategoryExist)
        throw new BadGatewayException(
          `${createCategoryDto.categoryName} category already exists`,
        );

      const category = await this.categoryRepository.create(createCategoryDto);

      if (!category) throw new NotFoundException();

      return category;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException();
      }

      if (err instanceof BadGatewayException) {
        throw new BadGatewayException(
          `${createCategoryDto.categoryName} category already exists`,
        );
      }

      throw new HttpException('Something went wrong', 500);
    }
  }

  async fetchAll() {
    try {
      const products = await this.categoryRepository.findAll();

      if (!products) throw new NotFoundException();

      return products;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async fetchDetail(id: number) {
    try {
      const detail = await this.categoryRepository.findOne(id);

      if (!detail) throw new NotFoundException('Not found');
      return detail;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async delete(id: number) {
    try {
      const category = await this.categoryRepository.findOne(id);
      if (!category) throw new NotFoundException();
      await this.categoryRepository.softRemove(category);
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
