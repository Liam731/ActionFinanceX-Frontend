import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import FakeBAYC from "../abis/FakeBAYC.json";
import { CONFIG } from "../../config";

export default function MintFakeBAYC() {
  const [approveTokenId, setApproveTokenId] = React.useState("");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setApproveTokenId(event.target.value);

  const { address } = useAccount();
  // mint button
  const { config: mintConfig } = usePrepareContractWrite({
    address: CONFIG.FBAYC_CONTRACT_ADDRESS,
    abi: FakeBAYC,
    functionName: "mint",
  });

  const {
    data: txHash,
    write: mintWrite,
    isSuccess,
    isLoading: isPending,
    error,
    reset,
  } = useContractWrite(mintConfig);

  // approve button
  const { config: approveConfig } = usePrepareContractWrite({
    address: CONFIG.FBAYC_CONTRACT_ADDRESS,
    abi: FakeBAYC,
    functionName: "approve",
    args: [CONFIG.POOL_CONTRACT_ADDRESS, approveTokenId],
  });

  const { write: approveWrite } = useContractWrite(approveConfig);

  return (
    <div className="">
      <button
        disabled={!mintWrite || isPending}
        onClick={() => mintWrite?.()}
        className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
      >
        {isPending ? 'Confirming...' : 'MintFakeBAYC'} 
      </button>
      {/* <button
        disabled={!approveWrite}
        onClick={() => approveWrite?.()}
        className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
      >
        ApproveFBAYC
      </button>
      <p>Token id (The token id to be approved): {approveTokenId}</p>
      <input
        className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
        type="text"
        value={approveTokenId}
        onChange={handleChange}
        placeholder="Enter token id"
      /> */}
    </div>
  );
}
