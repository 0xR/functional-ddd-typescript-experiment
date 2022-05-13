import * as t from 'io-ts';

const customerInfoCodec = t.interface({
  FirstName: t.string,
  LastName: t.string,
  EmailAddress: t.string,
});

const orderFromCodec = t.interface({
  OrderId: t.string,
  CustomerInfo: customerInfoCodec,
  // ShippingAddress: AddressDto
  // BillingAddress: AddressDto
  // Lines: OrderFormLineDto list
});
