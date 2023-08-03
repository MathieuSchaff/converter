"use client";
// this component will fetch coingecko api to get the ethereum price
// and display it in a table

import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import useSWR from 'swr';
interface EthPriceData {
  [currency: string]: number;
}
const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple/',
});
const getPrice = async (currency: string) => {
  const params = {
    ids: 'ethereum',
    vs_currencies: currency,
  };
  const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>("/price", {
    params: params,
  });
  const ethPriceData: EthPriceData = response.data;
  return ethPriceData;
}
const Coin = () => {
  const [coinPrice, setCoinPrice] = useState<EthPriceData>();
  const [currency, setCurrency] = useState<string>("usd");
  const key = '/price?ids=ethereum&vs_currencies=' + currency; // Define the cache key
  const { data, error } = useSWR(key, () => getPrice(currency));
  console.log(data);
  console.log(error);
  // useEffect(() => {
  //   const fetchPrice = async () => {
  //     const params = {
  //       ids: 'ethereum',
  //       vs_currencies: currency,
  //     };
  //     try {
  //       const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>("/price", {
  //         params: params,
  //       });
  //       const ethPriceData: EthPriceData = response.data;
  //       setCoinPrice(ethPriceData)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     finally {
  //       console.log("finally");
  //     }
  //
  //   }
  //   fetchPrice();
  // }, [currency]);
  return (<div>
    <h3>Coin</h3>
    <div>
      {/* {coinPrice && JSON.stringify(coinPrice)} */}
      {data && JSON.stringify(data)}
    </div>
  </div>);
}
export default Coin;
