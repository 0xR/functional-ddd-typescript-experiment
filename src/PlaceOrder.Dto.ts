import * as t from 'io-ts';

const customerInfoCodec = t.interface({
  FirstName: t.string,
  LastName: t.string,
  EmailAddress: t.string,
});

export type CustomerInfo = t.TypeOf<typeof customerInfoCodec>;


const orderFormCodec = t.interface({
  OrderId: t.string,
  CustomerInfo: customerInfoCodec,
  // ShippingAddress: AddressDto
  // BillingAddress: AddressDto
  // Lines: OrderFormLineDto list
});

export type OrderForm = t.TypeOf<typeof orderFormCodec>;
