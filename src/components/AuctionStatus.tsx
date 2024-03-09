import React, { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { CONFIG } from "../../config";
import PunkWarriorErc721 from "../abis/PunkWarriorErc721.json";
import {
  StatGroup,
  StatLabel,
  StatHelpText,
  StatNumber,
  Stat,
  StatArrow,
  AbsoluteCenter,
} from "@chakra-ui/react";

export default function AuctionStatus() {
  // Counter
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const year = new Date().getFullYear();
      const different =
        Number(new Date(2024, 2, 8, 12, 30, 45)) - Number(new Date());
      if (different > 0) {
        const days = Math.floor(different / (1000 * 60 * 60 * 24));
        const hours = Math.floor((different / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((different / (1000 * 60)) % 60);
        const seconds = Math.floor((different / 1000) % 60);
        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Timer
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Current price
  const [currentPrice, setCurrentPrice] = useState<String>("0");
  const { data: currentPriceData, refetch: refethCurrentPriceData } =
    useContractRead({
      address: CONFIG.AUCTION_CONTRACT_ADDRESS,
      abi: PunkWarriorErc721,
      functionName: "getAuctionPrice",
    });

  useEffect(() => {
    if (currentPriceData) {
      setCurrentPrice(currentPriceData.toString());
    }
  }, [currentPriceData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refethCurrentPriceData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* <p>
        距離 12/25 還有 {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </p> */}
      <p className="bg-blue-900 border-2 border-White flex justify-center items-center h-full text-2xl mx-96 mt-10 py-5 rounded-lg">
        CURRENT PRICE: {Number(currentPrice) / 1e18} (1e18 SToken)
      </p>
    </div>
  );
}
