import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import SToken from "../abis/SToken.json";
import FakeBAYC from "../abis/FakeBAYC.json";
import CollateralPoolLoan from "../abis/CollateralPoolLoan.json";
import PunkWarriorErc721 from "../abis/PunkWarriorErc721.json";
import { CONFIG } from "../../config";
import Decimal from "decimal.js";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  AbsoluteCenter,
} from "@chakra-ui/react";

export default function STokenStatus() {
  const [baycBalance, setBaycBalance] = useState<String>("0");
  const [bayctokenIdList, setBaycTokenIdList] = useState<String>("0");
  const [collateralizedBayc, setCollateralizedBayc] = useState<String>("0");
  const [sTokenBalance, setSTokenBalance] = useState<Decimal>(new Decimal(0));
  const [auctionBalance, setAuctionBalanceData] = useState<String>("0");
  const [statusInfo, setStatusInfo] = useState<
    Array<{ label: string; value: string; unit: string }>
  >([]);

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
      address: CONFIG.AUCTION_CONTRACT_ADDRESS,
      abi: PunkWarriorErc721,
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

  useEffect(() => {
    if (statusInfo) {
      let tempList = bayctokenIdList.split(",");
      tempList.sort((a, b) => Number(a) - Number(b));
      let sortedBaycTokenId = "";
      for (let i = 0; i < tempList.length; i++) {
        sortedBaycTokenId += tempList[i];
        if (i < tempList.length - 1) {
          sortedBaycTokenId += ",";
        }
      }
      tempList = collateralizedBayc.split(",");
      tempList.sort((a, b) => Number(a) - Number(b));
      let sortedCollateralizedTokenId = "";
      for (let i = 0; i < tempList.length; i++) {
        sortedCollateralizedTokenId += tempList[i];
        if (i < tempList.length - 1) {
          sortedCollateralizedTokenId += ",";
        }
      }
      setStatusInfo([
        {
          label: "FBAYC balance",
          value: baycBalance as string,
          unit: "",
        },
        {
          label: "FBAYC token id list",
          value: sortedBaycTokenId as string,
          unit: "",
        },
        {
          label: "Collateralized FBAYC token id list",
          value: sortedCollateralizedTokenId as string,
          unit: "",
        },
        {
          label: "SToken balance",
          value: sTokenBalance.toFixed(3).toString(),
          unit: "1e18 SToken",
        },
        {
          label: "Auction item balance",
          value: auctionBalance as string,
          unit: "",
        },
      ]);
    }
  }, [statusInfo]);

  return (
    <div>
      {/* <p>FBAYC balance: {baycBalance}</p>
      <p>FBAYC token id list: {bayctokenIdList}</p>
      <p>Collateralized FBAYC token id list: {collateralizedBayc}</p>
      <p>SToken balance: {sTokenBalance.toFixed(3)}</p>
      <p>Auction item balance: {auctionBalance}</p> */}
      <TableContainer className="border-2 border-white mx-96 mt-64 py-5 pl-60 bg-gradient-to-r from-cyan-700 to-blue-700 rounded-lg">
        <Table size="lg">
          <TableCaption className="text-2xl mt-5 mx-40">
            Status Info
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Parameter Name</Th>
              <Th isNumeric>Value</Th>
              <Th>Unit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {statusInfo.map((info, index) => (
              <Tr key={index} className="border-b border-white">
                <Td>{info.label}</Td>
                <Td>{info.value}</Td>
                <Td>{info.unit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
