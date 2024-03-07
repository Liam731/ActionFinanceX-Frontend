import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import CollateralPool from "../abis/CollateralPool.json";
// import { Input } from "@chakra-ui/react";
import { CONFIG } from "../../config";

export default function ColleteralPool() {
  const [collateralizeTokenId, setCollateralizeTokenId] = React.useState("");
  const [redeemETH, setRedeemETH] = React.useState("");
  const [redeemTokenId, setRedeemTokenId] = React.useState("");
  const [repayETH, setRepayETH] = React.useState("");
  const [repayTokenId, setRepayTokenId] = React.useState("");
  const [repaySTokenAmount, setRepaySTokenAmount] = React.useState("");
  const { address } = useAccount();

  // Collateralize Button
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setCollateralizeTokenId(event.target.value);

  const { config: collateralConfig } = usePrepareContractWrite({
    address: CONFIG.POOL_CONTRACT_ADDRESS,
    abi: CollateralPool,
    functionName: "collateralize",
    args: [CONFIG.FBAYC_CONTRACT_ADDRESS, collateralizeTokenId],
  });
  const { write: collateralWrite } = useContractWrite(collateralConfig);
  // Repay Button
  const RepayETHHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setRepayETH(event.target.value);
  const RepayHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setRepayTokenId(event.target.value);
  const RepaySTokenAmountHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setRepaySTokenAmount(event.target.value);

  const { config: repayConfig } = usePrepareContractWrite({
    address: CONFIG.POOL_CONTRACT_ADDRESS,
    abi: CollateralPool,
    functionName: "repay",
    args: [
      CONFIG.FBAYC_CONTRACT_ADDRESS,
      repayTokenId,
      Number(repaySTokenAmount) * 10 ** 18,
    ],
    value: BigInt(Number(repayETH) * 10 ** 18),
  });
  const { write: repayWrite } = useContractWrite(repayConfig);
  // Redeem Button
  const RedeemETHHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setRedeemETH(event.target.value);
  const RedeemHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setRedeemTokenId(event.target.value);

  const { config: redeemConfig } = usePrepareContractWrite({
    address: CONFIG.POOL_CONTRACT_ADDRESS,
    abi: CollateralPool,
    functionName: "redeem",
    args: [CONFIG.FBAYC_CONTRACT_ADDRESS, redeemTokenId],
    value: BigInt(Number(redeemETH) * 10 ** 18),
  });
  const { write: redeemWrite } = useContractWrite(redeemConfig);

  // Liquidate Button
  // const { config: liquidateConfig } = usePrepareContractWrite({
  //   address: CONFIG.POOL_CONTRACT_ADDRESS,
  //   abi: CollateralPool,
  //   functionName: "liquidate",
  //   args: [CONFIG.FBAYC_CONTRACT_ADDRESS, 1],
  // });
  // const { write: liquidateWrite } = useContractWrite(liquidateConfig);

  return (
    <div className="mt-5">
      {/* Collateralize Button */}
      <div className="border-2 flex justify-between items-center px-4 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500">
        <div className="flex-col flex">
          <p className="mr-2">
            Token id (The token id to be collateralized): {collateralizeTokenId}
          </p>
          <input
            className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-20 h-8 mt-4"
            type="text"
            value={collateralizeTokenId}
            onChange={handleChange}
            placeholder="Enter token id"
          />
        </div>
        <button
          disabled={!collateralWrite}
          onClick={() => collateralWrite?.()}
          className="bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
        >
          Collateralize
        </button>
      </div>
      {/* Repay Button */}
      <div className="mt-10 border-2 flex justify-between items-center px-4 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500">
        <div className="flex-col flex">
          <p>Value (Send ETH to be repay): {repayETH}</p>
          <input
            className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
            type="text"
            value={repayETH}
            onChange={RepayETHHandleChange}
            placeholder="Enter ETH value"
          />
          <p>Token id (The token id to be repay): {repayTokenId}</p>
          <input
            className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
            type="text"
            value={repayTokenId}
            onChange={RepayHandleChange}
            placeholder="Enter token id"
          />
          <p>SToken Amount (SToken Amount to be repay): {repaySTokenAmount}</p>
          <input
            className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
            type="text"
            value={repaySTokenAmount}
            onChange={RepaySTokenAmountHandleChange}
            placeholder="Enter SToken amount"
          />
          <button
            disabled={!repayWrite}
            onClick={() => repayWrite?.()}
            className="bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
          >
            Repay
          </button>
        </div>
      </div>

      {/* Redeem Button */}
      <div>
        <button
          disabled={!redeemWrite}
          onClick={() => redeemWrite?.()}
          className="bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
        >
          Redeem
        </button>
        <p>Value (Send ETH to be redeem): {redeemETH}</p>
        <input
          className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
          type="text"
          value={redeemETH}
          onChange={RedeemETHHandleChange}
          placeholder="Enter ETH value"
        />
        <p>Token id (The token id to be redeem): {redeemTokenId}</p>
        <input
          className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
          type="text"
          value={redeemTokenId}
          onChange={RedeemHandleChange}
          placeholder="Enter token id"
        />
        
      </div>

      
      {/* Liquidate Button */}
      {/* <button
        disabled={!liquidateWrite}
        onClick={() => liquidateWrite?.()}
        className="bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
      >
        liquidate
      </button> */}
    </div>
  );
}
