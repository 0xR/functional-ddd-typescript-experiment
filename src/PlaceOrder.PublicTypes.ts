import * as t from 'io-ts';

const customerInfoDtoCodec = t.interface({
  FirstName: t.string,
  LastName: t.string,
  EmailAddress: t.string,
});

export type CustomerInfoDto = t.TypeOf<typeof customerInfoDtoCodec>;

const orderFormLineDtoCodec = t.interface({
  OrderLineId: t.string,
  ProductCode: t.string,
  Quantity: t.number
});

export type OrderFormLineDto = t.TypeOf<typeof orderFormLineDtoCodec>;

const x = (deps) => (unvalidatedOrder) => {

}

const unvalidatedOrderFormCodec = t.interface({
  _tag: 'xx',
  OrderId: t.string,
  CustomerInfo: customerInfoDtoCodec,
  Lines: t.array(orderFormLineDtoCodec)
});

export type OrderFormDto = t.TypeOf<typeof unvalidatedOrderFormCodec>;
