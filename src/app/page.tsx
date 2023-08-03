"use client";
import React, { useReducer } from 'react'
import Coin from './_components/Coin';
interface State {
  ethValue: number | string;
  weiValue: number | string;
  gweiValue: number | string;
}

type Action = {
  name: keyof State;
  value: string;
};
const reducer = (state: State, action: Action): State => {
  const { name, value } = action;
  const numberValue = parseFloat(value);
  if (Number.isNaN(numberValue)) {
    return {
      ethValue: "",
      weiValue: "",
      gweiValue: "",
    }
  }
  switch (name) {
    case 'ethValue':
      return {
        ethValue: numberValue,
        weiValue: numberValue * 10 ** 18,
        gweiValue: numberValue * 10 ** 9,
      };
    case 'weiValue':
      return {
        ethValue: numberValue / 10 ** 18,
        weiValue: numberValue,
        gweiValue: numberValue / 10 ** 9,
      };
    case 'gweiValue':
      return {
        ethValue: numberValue / 10 ** 9,
        weiValue: numberValue * 10 ** 9,
        gweiValue: numberValue,
      };
    default:
      return state;
  }
}
const initialState = {
  ethValue: 0,
  weiValue: 0,
  gweiValue: 0,
};
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (parseFloat(e.target.value) < 0) return;
    const { name, value } = e.target;
    dispatch({ name: name as keyof State, value: parseFloat(value).toString() });
  };
  return (
    <main className="flex flex-col gap-6 items-center justify-between p-24">
      <h3>Ethereum (ETH) Converter</h3>
      <label>
        ETH:
        <input
          type="number"
          step="0.01"
          name="ethValue"
          value={state.ethValue}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Wei:
        <input
          type="number"
          name="weiValue"
          value={state.weiValue}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gwei:
        <input
          type="number"
          name="gweiValue"
          value={state.gweiValue}
          onChange={handleChange}
        />
      </label>
      <Coin ethValue={state.ethValue} />
    </main>
  );
}
