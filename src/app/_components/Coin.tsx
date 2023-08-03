"use client";
// this component will fetch coingecko api to get the ethereum price
// and display it in a table

import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
interface EthPriceData {
  [currency: string]: number;
}
const axiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple/',
});

const Coin = () => {
  const [coinPrice, setCoinPrice] = useState<EthPriceData>();
  const [currency, setCurrency] = useState<string>("usd");
  useEffect(() => {
    const fetchPrice = async () => {
      const params = {
        ids: 'ethereum',
        vs_currencies: currency,
      };
      try {
        const response: AxiosResponse<EthPriceData> = await axiosInstance.get<EthPriceData>("/price", {
          params: params,
        });
        const ethPriceData: EthPriceData = response.data;
        setCoinPrice(ethPriceData)
      } catch (error) {
        console.log(error);
      }
      finally {
        console.log("finally");
      }

    }
    fetchPrice();
  }, [currency]);
  return (<div>
    <h3>Coin</h3>
    {/* <table> */}
    {/*   <thead> */}
    {/*     <tr> */}
    {/*       <th>Currency</th> */}
    {/*       <th>Price</th> */}
    {/*     </tr> */}
    {/*   </thead> */}
    {/*   <tbody> */}
    {/*     {coinPrice && Object.keys(coinPrice).map((currency: string) => { */}
    {/*       return ( */}
    {/*         <tr key={currency}> */}
    {/*           <td>{currency}</td> */}
    {/*           <td>{coinPrice[currency]}</td> */}
    {/*         </tr> */}
    {/*       ) */}
    {/*     })} */}
    {/*   </tbody> */}
    {/* </table> */}
    <div>
      {coinPrice && JSON.stringify(coinPrice)}
    </div>
  </div>);
}
export default Coin;
