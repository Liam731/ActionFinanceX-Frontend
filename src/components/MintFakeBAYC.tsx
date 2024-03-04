import React, { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import FakeBAYC from "../abis/FakeBAYC.json";
import { CONFIG } from "../../config";

export default function MintFakeBAYC() {
  const [ balance, setBalance ] = useState<String>("0");
  const [ totalSupply, setTotalSupply ] = useState<String>("0");
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: CONFIG.FBAYC_CONTRACT_ADDRESS,
    abi: FakeBAYC,
    functionName: "mint",
  });

  const { data: txHash, write, isSuccess, reset } = useContractWrite(config);
  const { data: total, refetch: refetchTotalSupply } = useContractRead({
    address: CONFIG.FBAYC_CONTRACT_ADDRESS,
    abi: FakeBAYC,
    functionName: "totalSupply",
  });
  const { data: amount, refetch: refetchBalance } = useContractRead({
    address: CONFIG.FBAYC_CONTRACT_ADDRESS,
    abi: FakeBAYC,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (total) {
      setTotalSupply(total.toString());
    }
  }, [total]);

  useEffect(() => {
    if (amount) {
      setBalance(amount.toString());
    }
  }, [amount]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className = "">
      <p>Your FBAYC Balance:: {balance}</p>
      <button 
        disabled={!write}
        onClick={() => write?.()}
        className = "bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
      >
        MintFakeBAYC
      </button>

      <button 
        onClick={handleRefresh}
        className = "bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
      >
        Refresh
        </button>
    </div>
  )
}
