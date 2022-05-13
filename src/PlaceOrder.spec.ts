import { orderApi } from './PlaceOrder.Api';

it('hello', () => {
  orderApi({
    body: JSON.stringify({}),
  });
});
