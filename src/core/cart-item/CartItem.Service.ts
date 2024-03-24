import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItemRepository } from './CartItem.Repository';
import { CreateCartItemDto } from './dto/CreateCartItemDto';

@Injectable()
export class CartItemService {
  constructor(private readonly cartItemRepository: CartItemRepository) {}

  async create(createCartItemDto: CreateCartItemDto, userId: number) {
    try {
      const itemExists = await this.cartItemRepository.findBy({
        productId: createCartItemDto.productId,
        userId,
      });

      if (itemExists) {
        const update = await this.cartItemRepository.update({
          id: itemExists.id,
          quantity: createCartItemDto.quantity,
        });

        if (!update) throw new BadRequestException();

        if (update.quantity === 0) {
          await this.cartItemRepository.softDelete(update.id);
        }
        return update;
      }

      const newCartItem = await this.cartItemRepository.create({
        ...createCartItemDto,
        userId,
      });

      if (!newCartItem) throw new BadRequestException();

      return newCartItem;
    } catch (err) {
      err;
      throw new HttpException('Something went wrong', 500);
    }
  }

  async fetch(userId: number) {
    try {
      const cartItems = await this.cartItemRepository.findAll(userId);

      if (!cartItems) throw new NotFoundException('Item not found');
      let subTotal: number = 0;

      cartItems.forEach((cartItem) => {
        cartItem.totalPrice =
          cartItem.quantity * +cartItem?.product.productPrice;
        subTotal =
          subTotal + cartItem.quantity * +cartItem?.product.productPrice;
      });

      return { cartItems, subTotal };
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async deleteBy(userId: number) {
    await this.cartItemRepository.deleteBy(userId);
  }

  async findBy(by: { productId: number; userId: number }) {
    try {
      const item = await this.cartItemRepository.findBy(by);
      return item;
    } catch (err) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async softDelete(id: number) {
    await this.cartItemRepository.softDelete(id);
  }
}
