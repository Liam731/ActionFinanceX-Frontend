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

export default function CalleteralPool() {
  const [value, setValue] = React.useState("");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValue(event.target.value);
  const { address } = useAccount();
  const { config : CollateralConfig } = usePrepareContractWrite({
    address: CONFIG.POOL_CONTRACT_ADDRESS,
    abi: CollateralPool,
    functionName: "collateralize",
    args: [CONFIG.FBAYC_CONTRACT_ADDRESS,1],
  });
  const {write : CollateralWrite} = useContractWrite(CollateralConfig);

  return (
    <div>
      <button
        disabled={!CollateralWrite}
        onClick={() => CollateralWrite?.()}
        className="bg-slate-500 hover:bg-slate-700 rounded-lg px-5 py-3 text-2xl"
      >
        Collateralize
      </button>
      {/* <p>Value: {value}</p> */}
      <p>Value: {value}</p>
      {/* <Input
        // value={value}
        // onChange={handleChange}
        // placeholder="Here is a sample placeholder"
        size="sm"
      /> */}

      <input
        className="bg-black text-white border-2 border-white px-4 py-2 rounded-md"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Enter value"
      />
    </div>
  );
}
