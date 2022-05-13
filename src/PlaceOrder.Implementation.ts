import { OrderFormDto } from './PlaceOrder.Dto';
import { Option, isNone, some, none } from 'fp-ts/Option';
import { Either, left, right } from 'fp-ts/Either';

export type AppValidation<T> = Either<Error, T>;

export function validateOrder(
  order: OrderFormDto,
  existingOrder: Option<OrderFormDto>,
): AppValidation<OrderFormDto> {
  if (isNone(existingOrder)) {
    return right(order);
  }
  return left(new Error(`Order already exists with orderId ${order.OrderId}`));
}
