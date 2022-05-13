import { OrderFormDto, orderFormDtoCodec } from './PlaceOrder.Dto';
import { Database } from './database';
import { Option } from 'fp-ts/Option';
import { validateOrder } from './PlaceOrder.Implementation';
import { isLeft } from 'fp-ts/Either';

function orderKey(orderId: string) {
  return `order-${orderId}`;
}

function storeOrder(order: OrderFormDto, { database }: { database: Database }) {
  database.set(orderKey(order.OrderId), order);
}

function loadOrder(
  orderId: string,
  { database }: { database: Database },
): Option<OrderFormDto> {
  return database.get(orderKey(orderId)) as Option<OrderFormDto>;
}

interface HttpRequest {
  body: string;
}

const dependencies = {
  database: new Database(),
};

export function orderApi({ body }: { body: unknown }) {
  // IO
  const orderFormEither = orderFormDtoCodec.decode(body);
  if (isLeft(orderFormEither)) {
    return orderFormEither.left;
  }

  const existingFormEither = loadOrder(
    orderFormEither.right.OrderId,
    dependencies,
  );

  //Pure code
  const validationEither = validateOrder(
    orderFormEither.right,
    existingFormEither,
  );

  if (isLeft(validationEither)) {
    return validationEither.left;
  }

  // IO
  storeOrder(orderFormEither.right, dependencies);
  return validationEither.right;
}
