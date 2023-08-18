import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExchangeRateInterface } from '../types/ExchangeRate';


export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query<ExchangeRateInterface[], undefined>({
      query: () => 'rates/getexchangerates',
    }),
  })
});

export const { useGetExchangeRatesQuery } = ratesApi;
