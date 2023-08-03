"use client";
// this component will fetch coingecko api to get the ethereum price
// and display it in a table

import React, { useMemo, useState } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import useSWR from 'swr';
interface EthPriceData {
  [currency: string]: number;
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple/',
});
type GetPrice = (args: string[]) => Promise<EthPriceData>;
const getPrice: GetPrice = async (args) => {
  console.log(args);
  const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>(args[0], {
    params: args[1],
  });
  const ethPriceData: EthPriceData = response.data;
  return ethPriceData;
}
const Coin = () => {
  // const [coinPrice, setCoinPrice] = useState<EthPriceData>();
  const [currency, setCurrency] = useState<string>("usd");
  const params = useMemo(() => {
    return {
      ids: 'ethereum',
      vs_currencies: currency,
    };
  }, [currency]);

  const { data, error, mutate, isLoading } = useSWR(["/price", params], getPrice);
  return (<div>
    <h3>Coin</h3>
    <div>
      {/* {coinPrice && JSON.stringify(coinPrice)} */}
      {isLoading && <div>Loading...</div>}
      {data && JSON.stringify(data)}
    </div>
  </div>);
}
export default Coin;
