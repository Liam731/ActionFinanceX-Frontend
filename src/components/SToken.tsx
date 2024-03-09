import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import SToken from "../abis/SToken.json";
import { CONFIG } from "../../config";

export default function MintFakeBAYC() {
  const [approveValue, setApproveValue] = React.useState("");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setApproveValue(event.target.value);

  // approve button
  const { config: approveConfig } = usePrepareContractWrite({
    address: CONFIG.STOKEN_CONTRACT_ADDRESS,
    abi: SToken,
    functionName: "approve",
    args: [CONFIG.POOL_CONTRACT_ADDRESS, Number(approveValue) * 10 ** 18],
  });

  const { write: approveWrite } = useContractWrite(approveConfig);

  return (
    <div className="">
      <button
        disabled={!approveWrite}
        onClick={() => approveWrite?.()}
        className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
      >
        ApproveSToken
      </button>
      <p>Value (The value to be approved): {approveValue}</p>
      <input
        className="bg-black text-white border-2 border-white px-4 py-2 rounded-md w-1/6 h-8"
        type="text"
        value={approveValue}
        onChange={handleChange}
        placeholder="Enter Value"
      />
    </div>
  );
}
