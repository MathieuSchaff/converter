
import React from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import axios, { AxiosResponse } from 'axios';
// import { ethers } from "ethers";

interface GasPriceData {
  fast: number;
  // You can add other gas price types here, like "standard" or "slow"
}

const fetcher = async (url: string): Promise<GasPriceData> => {
  const response: AxiosResponse<GasPriceData> = await axios.get(url);
  return response.data;
};

const GasPriceComponent: React.FC = () => {
  const fetchConfig: SWRConfiguration<GasPriceData, any> = {
    refreshInterval: 60 * 10000, // Set the refresh interval (in milliseconds) as needed
  };

  // const { data: gasPrice, error } = useSWR('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=2ER1SM3C6I61DPUCM7FPN7FFPRNS3FPYBD'
  //   , fetcher, fetchConfig);
  const { data: gasPrice, error } = useSWR('https://api.etherscan.io/api?module=gastracker&action=gasoracle'
    , fetcher, fetchConfig);

  // https://api.etherscan.io/api?module=gastracker&action=gasoracle
  if (error) {
    return <div>Error fetching gas price.</div>;
  }
  console.log(gasPrice);
  return (
    <div>
      {/* {error && <div>Error fetching gas price.</div>} */}
      {gasPrice ? <p>Ethereum Gas Price: {gasPrice.fast} Gwei</p> : <p>Loading gas price...</p>}
    </div>
  );
};

export default GasPriceComponent;
