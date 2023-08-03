"use client";
// this component will fetch coingecko api to get the ethereum price
// and display it in a table

import React, { useMemo, useState } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import useSWR from 'swr';
interface EthPriceData {
  [currency: string]: { usd: number };
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple/',
});
type GetPriceArg = [string, { ids: string, vs_currencies: string }];
type GetPrice = (args: GetPriceArg) => Promise<EthPriceData>;
const getPrice: GetPrice = async (args) => {
  // console.log(args);
  const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>(args[0], {
    params: args[1],
  });
  const ethPriceData: EthPriceData = response.data;
  return ethPriceData;
}

const Coin = ({ ethValue }: { ethValue: number }) => {
  // const [coinPrice, setCoinPrice] = useState<EthPriceData>();
  const [currency, setCurrency] = useState<string>("usd");
  const params = useMemo(() => {
    return {
      ids: 'ethereum',
      vs_currencies: currency,
    };
  }, [currency]);

  const { data, error, mutate, isLoading } = useSWR(["/price", params], getPrice, {
    errorRetryInterval: 60 * 1000,
    errorRetryCount: 3,
  }
  );

  if (error) console.error(error)
  let priceUsd;
  if (data) {
    console.log("data")
    console.log(data.ethereum.usd)
    console.log(ethValue)
    priceUsd = data.ethereum.usd * ethValue;

  }
  console.log("priceUsd", priceUsd)
  return (<div>
    <h3>Coin</h3>
    <div>
      {/* <button onClick={() => setCurrency("usd")}>USD</button> */}
      {priceUsd && priceUsd > 0 ? <div>{priceUsd}</div> : '0 $'}
      {error && <div>Failed to fetched price</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  </div>);
}
export default Coin;
