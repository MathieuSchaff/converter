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
  console.log(args);
  const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>(args[0], {
    params: args[1],
  });
  const ethPriceData: EthPriceData = response.data;
  return ethPriceData;
}

const Coin = ({ ethValue }: { ethValue: string | number }) => {
  let ethValueToNumber = typeof ethValue === 'string' ? parseFloat(ethValue) : ethValue;
  if (Number.isNaN(ethValueToNumber)) {
    ethValueToNumber = 0;
  }
  const params = {
    ids: 'ethereum',
    vs_currencies: 'usd',
  }
  const { data, error, mutate, isValidating } = useSWR(["/price", params], getPrice, {
    errorRetryInterval: 60 * 1000,
    errorRetryCount: 3,
  }
  );

  if (error) console.error(error)
  let priceUsd;
  if (data) {
    priceUsd = data.ethereum.usd * ethValueToNumber;
  }

  const handleRefresh = () => {
    mutate();
  };
  return (<div className="container mx-auto mt-8 max-w-md">
    <h3 className="text-xl font-semibold mb-4">Coin Price</h3>
    {isValidating && <div className="mb-2">Loading...</div>}
    {!isValidating && (
      <div className="flex flex-col">
        {data ? (
          <div className="mb-2">Price: {priceUsd} $</div>
        ) : (
          <div className="mb-2">Price: N/A</div>
        )}
        {error && (
          <div className="text-red-500 mb-2">Error fetching data</div>
        )}
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          {error && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleRefresh}
            >
              Retry
            </button>
          )}
        </div>
      </div>
    )}
  </div>
  );
};

export default Coin;
