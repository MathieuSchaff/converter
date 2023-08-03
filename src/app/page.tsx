"use client";
import React, { useReducer } from 'react'
interface State {
  ethValue: number;
  weiValue: number;
  gweiValue: number;
}

type Action = {
  name: keyof State;
  value: number;
};
const reducer = (state: State, action: Action): State => {
  const { name, value } = action;
  switch (name) {
    case 'ethValue':
      return {
        ethValue: value,
        weiValue: value * 10 ** 18,
        gweiValue: value * 10 ** 9,
      };
    case 'weiValue':
      return {
        ethValue: value / 10 ** 18,
        weiValue: value,
        gweiValue: value / 10 ** 9,
      };
    case 'gweiValue':
      return {
        ethValue: value / 10 ** 9,
        weiValue: value * 10 ** 9,
        gweiValue: value,
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
    const { name, value } = e.target;
    dispatch({ name: name as keyof State, value: parseFloat(value) });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
  );
}
