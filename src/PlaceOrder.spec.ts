import { orderApi } from './PlaceOrder.Api';
import { OrderFormDto } from './PlaceOrder.Dto';

it('should now allow posting the same order twice', () => {
  const orderForm: OrderFormDto = {
    OrderId: '01',
    CustomerInfo: {
      EmailAddress: 'email',
      FirstName: 'firstname',
      LastName: 'last',
    },
    Lines: [
      {
        OrderLineId: '01',
        ProductCode: 'product01',
        Quantity: 9001,
      },
    ],
  };
  const result = orderApi({
    body: orderForm,
  });
  expect(result).toMatchObject({ OrderId: orderForm.OrderId });
  const result2 = orderApi({
    body: orderForm,
  });
  expect(result2).toEqual(new Error('Order already exists with orderId 01'));
});
