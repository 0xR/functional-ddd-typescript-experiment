import { OrderFormDto, orderFormDtoCodec } from './PlaceOrder.Dto';
import { Database } from './database';
import { Option } from 'fp-ts/Option';
import { validateOrder } from './PlaceOrder.Implementation';
import { chain, mapLeft, match, right } from 'fp-ts/Either';
import { flow } from 'fp-ts/function';
import * as Identity from 'fp-ts/Identity';
import { Errors } from 'io-ts';

function orderKey(orderId: string) {
  return `order-${orderId}`;
}

function storeOrder(
  order: OrderFormDto,
  { database }: { database: Database },
): OrderFormDto {
  database.set(orderKey(order.OrderId), order);
  return order;
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
  const workflow = flow(
    (request: unknown) => {
      return mapLeft(
        () => new Error('Could not decode OrderFromDto'),
      )(orderFormDtoCodec.decode(request));
    },
    chain((orderFormDto: OrderFormDto) => {
      const order = loadOrder(orderFormDto.OrderId, dependencies);
      return validateOrder(orderFormDto, order);
    }),
    chain((orderFormDto: OrderFormDto) =>
      right(storeOrder(orderFormDto, dependencies)),
    ),
  );

  const result = workflow(body);

  return match(Identity.of, Identity.of)(result)
}
