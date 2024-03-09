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
import MintFakeBAYC from "./MintFakeBAYC";

export default function ColleteralPool() {
  const [collateralizeTokenId, setCollateralizeTokenId] = React.useState("");
  const [redeemETH, setRedeemETH] = React.useState("");
  const [redeemTokenId, setRedeemTokenId] = React.useState("");
  const [repayETH, setRepayETH] = React.useState("");
  const [repayTokenId, setRepayTokenId] = React.useState("");
  const [repaySTokenAmount, setRepaySTokenAmount] = React.useState("");
  const [liquidateTokenId, setLiquidateTokenId] = React.useState("");
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
  const { write: collateralWrite, isLoading: isPending } = useContractWrite(collateralConfig);
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
  const liquidateHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setLiquidateTokenId(event.target.value);

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
  const { config: liquidateConfig } = usePrepareContractWrite({
    address: CONFIG.POOL_CONTRACT_ADDRESS,
    abi: CollateralPool,
    functionName: "liquidate",
    args: [CONFIG.FBAYC_CONTRACT_ADDRESS, liquidateTokenId],
  });
  const { write: liquidateWrite } = useContractWrite(liquidateConfig);

  return (
    <div className="mt-10">
      {/* Collateralize Button */}
      <div className="border-2 flex justify-between items-center px-10 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500 rounded-lg">
        <div className="flex-col flex">
          <p className="mr-2">
            Token id (The token id to be collateralized): {collateralizeTokenId}
          </p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 w-1/2 mt-2"
            type="text"
            value={collateralizeTokenId}
            onChange={handleChange}
            placeholder="Enter token id"
          />
        </div>
        <button
          disabled={!collateralWrite || isPending}
          onClick={() => collateralWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl ml-96"
        >
          {isPending ? 'Confirming...' : 'Collateralize'} 
        </button>
        <MintFakeBAYC />
      </div>
      {/* Repay Button */}
      <div className="mt-10 border-2 flex justify-between items-center px-10 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500 rounded-lg">
        <div className="flex-col flex">
          <p>Value (Send ETH to be repay): {repayETH} (1e18 ETH)</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={repayETH}
            onChange={RepayETHHandleChange}
            placeholder="Enter ETH value"
          />
        </div>
        <div className="flex-col flex">
          <p>Token id: {repayTokenId}</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={repayTokenId}
            onChange={RepayHandleChange}
            placeholder="Enter token id"
          />
        </div>
        <div className="flex-col flex">
          <p>SToken Amount: {repaySTokenAmount} (1e18 SToken)</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={repaySTokenAmount}
            onChange={RepaySTokenAmountHandleChange}
            placeholder="Enter SToken amount"
          />
        </div>
        <button
          disabled={!repayWrite}
          onClick={() => repayWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
        >
          Repay
        </button>
      </div>

      {/* Redeem Button */}
      <div className="mt-10 border-2 flex justify-between items-center px-10 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500 rounded-lg">
        <div className="flex-col flex">
          <p>Value (Send ETH to be redeem): {redeemETH} (1e18 ETH)</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={redeemETH}
            onChange={RedeemETHHandleChange}
            placeholder="Enter ETH value"
          />
        </div>
        <div className="flex-col flex">
          <p>Token id: {redeemTokenId}</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={redeemTokenId}
            onChange={RedeemHandleChange}
            placeholder="Enter token id"
          />
        </div>
        <button
          disabled={!redeemWrite}
          onClick={() => redeemWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
        >
          Redeem
        </button>
      </div>

      {/* Liquidate Button */}
      <div className="border-2 flex justify-between items-center px-10 py-4 mx-52 bg-gradient-to-r from-blue-900 to-block-500 rounded-lg mt-10">
        <div className="flex-col flex">
          <p className="mr-2">
            Token id: {liquidateTokenId}
          </p>
          <input
            className="bg-black text-white border-2 border-white rounded-md pl-3 max-w-52 mt-2"
            type="text"
            value={liquidateTokenId}
            onChange={liquidateHandleChange}
            placeholder="Enter token id"
          />
        </div>
        <button
          disabled={!liquidateWrite}
          onClick={() => liquidateWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl ml-96"
        >
          Liquidate
        </button>
      </div>
    </div>
  );
}
