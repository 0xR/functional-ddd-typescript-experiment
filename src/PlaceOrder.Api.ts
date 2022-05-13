import { OrderFormDto, orderFormDtoCodec } from './PlaceOrder.Dto';
import { Database } from './database';
import {isLeft} from 'fp-ts/es6/Either'

function orderKey(orderId: string) {

}
function storeOrder(order: OrderFormDto, { database}: {database: Database}) {
  database.set(orderKey(order.OrderId), order);
}

function loadOrder(orderId: string, { database}: {database: Database}): OrderFormDto {
  return database.get(orderKey(orderId)) as OrderFormDto;
}

interface HttpRequest {
  body: string;
}

export function orderApi({body}: { body: unknown }) {
  const ortherFormEither = orderFormDtoCodec.decode(body);


  // TODO:
  // load order
  // domain logic
  // write order
  console.log(ortherFormEither);
}
