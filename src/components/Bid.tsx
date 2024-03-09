import React, { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { CONFIG } from "../../config";
import PunkWarriorErc721 from "../abis/PunkWarriorErc721.json";

export default function Bid() {
  // Bid button
  const [bidPrice, setBidPrice] = React.useState("");
  const BidHandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setBidPrice(event.target.value);

  const { config: bidConfig } = usePrepareContractWrite({
    address: CONFIG.AUCTION_CONTRACT_ADDRESS,
    abi: PunkWarriorErc721,
    functionName: "bid",
    args: [Number(bidPrice) * 10 ** 18],
  });
  const { write: bidWrite, isLoading: isPendingBid } = useContractWrite(bidConfig);

  // Claim button
  const { config: claimConfig } = usePrepareContractWrite({
    address: CONFIG.AUCTION_CONTRACT_ADDRESS,
    abi: PunkWarriorErc721,
    functionName: "claimAuctionItem",
  });
  const { write: claimWrite, isLoading: isPendingClaim } = useContractWrite(claimConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      // fetchBlockTimestamp();
      // refetchAuctionIndex();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { id: 1, name: "Transactions every 24 hours", value: "44 million" },
    { id: 2, name: "Assets under holding", value: "$119 trillion" },
    { id: 3, name: "New users annually", value: "46,000" },
  ];

  return (
    //   <div className="bg-blue-300 py-24 sm:py-32">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
    //       {stats.map((stat) => (
    //         <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
    //           <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
    //           <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
    //             {stat.value}
    //           </dd>
    //         </div>
    //       ))}
    //     </dl>
    //   </div>
    // </div>

    <div>
      <div className="border-2 flex justify-between items-center px-10 py-5 mx-96 bg-gradient-to-r from-blue-900 to-block-500 mt-10 rounded-lg">
        <div className="flex-col flex">
          <p>Bid price: {bidPrice} (1e18 SToken)</p>
          <input
            className="bg-black text-white border-2 border-white rounded-md mt-2 pl-2"
            type="text"
            value={bidPrice}
            onChange={BidHandleChange}
            placeholder="Enter bid price"
          />
        </div>
        <button
          disabled={!bidWrite || isPendingBid}
          onClick={() => bidWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl ml-60"
        >
          {isPendingBid ? 'Confirming...' : 'Bid'} 
        </button>
        <button
          disabled={!claimWrite || isPendingClaim}
          onClick={() => claimWrite?.()}
          className="bg-teal-600 hover:bg-teal-700 rounded-lg px-5 py-3 text-2xl"
        >
          {isPendingClaim ? 'Confirming...' : 'Claim & Refund'}
        </button>
      </div>
    </div>
  );
}
