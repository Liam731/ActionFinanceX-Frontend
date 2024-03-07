import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { CONFIG } from "../../config";
import PunkWarriorErc721 from "../abis/PunkWarriorErc721.json";
import Decimal from "decimal.js";
import { list } from "postcss";

export default function AuctionInfo() {
  const [startTime, setStartTime] = useState<String>("0");
  const [endTime, setEndTime] = useState<String>("0");
  const [timeStep, setTimeStep] = useState<String>("0");
  const [startPrice, setStartPrice] = useState<String>("0");
  const [endPrice, setEndPrice] = useState<String>("0");
  const [lastBidPrice, setLastBidPrice] = useState<String>("0");
  const [priceStep, setPriceStep] = useState<String>("0");
  const [totalForAuction, setTotalForAuction] = useState<String>("0");
  const [totalBids, setTotalBids] = useState<String>("0");
  const [isAuctionActivated, setIsAuctionActivated] = useState<String>("0");
  const [isAllRefunded, setIsAllRefunded] = useState<String>("0");
  const [auctionIndex, setAuctionIndex] = useState<String>("0");

   // Auction index
   const { data: auctionIndexData, refetch: refetchAuctionIndex } = useContractRead({
    address: CONFIG.AUCTION_CONTRACT_ADDRESS,
    abi: PunkWarriorErc721,
    functionName: "auctionIndex",
  });
  console.log(auctionIndex);
  useEffect(() => {
    if (auctionIndexData) {
        setAuctionIndex(auctionIndexData.toString());
    }
  }, [auctionIndexData]);

  // Auction data
  const { data: auctionData, refetch: refetchAuction } = useContractRead({
    address: CONFIG.AUCTION_CONTRACT_ADDRESS,
    abi: PunkWarriorErc721,
    functionName: "auctionData",
    args: [auctionIndexData],
  });
  const dataList = String(auctionData).split(",");
  useEffect(() => {
    if (auctionData) {
      setStartTime(dataList[0]);
      setEndTime(dataList[1]);
      setTimeStep(dataList[2]);
      setStartPrice(dataList[3]);
      setEndPrice(dataList[4]);
      setLastBidPrice(dataList[5]);
      setPriceStep(dataList[6]);
      setTotalForAuction(dataList[7]);
      setTotalBids(dataList[8]);
      setIsAuctionActivated(dataList[9]);
      setIsAllRefunded(dataList[10]);
    }
  }, [auctionData]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       refetchAuction();
//       refetchAuctionIndex();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div>
      <p>startTime: {startTime}</p>
      <p>endTime: {endTime}</p>
      <p>timeStep: {timeStep}</p>
      <p>startPrice: {startPrice}</p>
      <p>endPrice: {endPrice}</p>
      <p>lastBidPrice: {lastBidPrice}</p>
      <p>priceStep: {priceStep}</p>
      <p>totalForAuction: {totalForAuction}</p>
      <p>totalBids: {totalBids}</p>
      <p>isAuctionActivated: {isAuctionActivated}</p>
      <p>isAllRefunded: {isAllRefunded}</p>
    </div>
  );
}
