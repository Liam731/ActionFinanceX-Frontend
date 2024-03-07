import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import SToken from "../abis/SToken.json";
import FakeBAYC from "../abis/FakeBAYC.json";
import CollateralPoolLoan from "../abis/CollateralPoolLoan.json";
import { CONFIG } from "../../config";
import Decimal from "decimal.js";

export default function STokenStatus() {
  const [baycBalance, setBaycBalance] = useState<String>("0");
  const [bayctokenIdList, setBaycTokenIdList] = useState<String>("0");
  const [collateralizedBayc, setCollateralizedBayc] = useState<String>("0");
  const [sTokenBalance, setSTokenBalance] = useState<Decimal>(new Decimal(0));
  const [auctionBalance, setAuctionBalanceData] = useState<String>("0");
  const { address } = useAccount();
  // FBAYC balance
  const { data: baycBalanceData, refetch: refetchBaycBalance } =
    useContractRead({
      address: CONFIG.FBAYC_CONTRACT_ADDRESS,
      abi: FakeBAYC,
      functionName: "balanceOf",
      args: [address],
    });
  useEffect(() => {
    if (baycBalanceData) {
      setBaycBalance(baycBalanceData.toString());
    }
  }, [baycBalanceData]);
  // FBAYC token id list

  const { data: baycTokenIdListData, refetch: refetchBaycTokenIdList } =
    useContractRead({
      address: CONFIG.FBAYC_CONTRACT_ADDRESS,
      abi: FakeBAYC,
      functionName: "getPersonalTokenIdList",
      args: [address],
    });
  useEffect(() => {
    if (baycTokenIdListData) {
      setBaycTokenIdList(baycTokenIdListData.toString());
    }
  }, [baycTokenIdListData]);
  // Collateralized FBAYC token id list
  const { data: collateralizedBaycData, refetch: refetchCollateralizedBayc } =
    useContractRead({
      address: CONFIG.POOL_LOAN_CONTRACT_ADDRESS,
      abi: CollateralPoolLoan,
      functionName: "getPersonalLoanTokenList",
      args: [address],
    });
  useEffect(() => {
    if (collateralizedBaycData) {
      setCollateralizedBayc(collateralizedBaycData.toString());
    }
  }, [collateralizedBaycData]);

  // SToken balance
  const { data: sTokenBalanceData, refetch: refetchSTokenBalance } =
    useContractRead({
      address: CONFIG.STOKEN_CONTRACT_ADDRESS,
      abi: SToken,
      functionName: "balanceOf",
      args: [address],
    });
  const sTokenBalanceDataDec = Number(sTokenBalanceData) / 10 ** 18;
  useEffect(() => {
    if (sTokenBalanceData) {
      setSTokenBalance(new Decimal(sTokenBalanceDataDec));
    }
  }, [sTokenBalanceData]);
  // Auction item balance

  const { data: auctionBalanceData, refetch: refetchAuctionBalance } =
    useContractRead({
      address: CONFIG.STOKEN_CONTRACT_ADDRESS,
      abi: SToken,
      functionName: "balanceOf",
      args: [address],
    });

  useEffect(() => {
    if (auctionBalanceData) {
      setAuctionBalanceData(auctionBalanceData.toString());
    }
  }, [auctionBalanceData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchBaycBalance?.();
      refetchBaycTokenIdList?.();
      refetchCollateralizedBayc?.();
      refetchSTokenBalance?.();
      refetchAuctionBalance?.();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>FBAYC balance: {baycBalance}</p>
      <p>FBAYC token id list: {bayctokenIdList}</p>
      <p>Collateralized FBAYC token id list: {collateralizedBayc}</p>
      <p>SToken balance: {sTokenBalance.toFixed(3)}</p>
      <p>Auction item balance: {auctionBalance}</p>
    </div>
  );
}
