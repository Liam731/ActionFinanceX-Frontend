import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONFIG } from "../../config";
import PunkWarriorErc721 from "../abis/PunkWarriorErc721.json";
import Web3 from "web3";
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

export default function AuctionInfo() {
  const [auctionIndex, setAuctionIndex] = useState<String>("0");
  const [blockTimestamp, setBlockTimestamp] = useState<BigInt>(BigInt(0));
  const [auctionInfo, setAuctionInfo] = useState<
    Array<{ label: string; value: string; unit: string }>
  >([]);
  const { data: auctionIndexData, refetch: refetchAuctionIndex } =
    useContractRead({
      address: CONFIG.AUCTION_CONTRACT_ADDRESS,
      abi: PunkWarriorErc721,
      functionName: "auctionIndex",
    });

  useEffect(() => {
    if (auctionIndexData) {
      setAuctionIndex(auctionIndexData.toString());
    }
  }, [auctionIndexData]);

  const { data: auctionData, refetch: refetchAuctionData } = useContractRead({
    address: CONFIG.AUCTION_CONTRACT_ADDRESS,
    abi: PunkWarriorErc721,
    functionName: "auctionData",
    args: [auctionIndex],
  });

  useEffect(() => {
    if (auctionData) {
      const dataList = String(auctionData).split(",");
      setAuctionInfo([
        {
          label: "Auction start time",
          value: formatTimestamp(dataList[0]),
          unit: "",
        },
        {
          label: "Auction end time",
          value: formatTimestamp(dataList[1]),
          unit: "",
        },
        {
          label: "Duration between deductions",
          value: dataList[2],
          unit: "second",
        },
        { label: "Initial price", value: (Number(dataList[3]) / 1e18).toString(), unit: "1e18 SToken" },
        { label: "Final price", value: (Number(dataList[4]) / 1e18).toString(), unit: "1e18 SToken" },
        { label: "Last bid price", value: (Number(dataList[5]) / 1e18).toString(), unit: "1e18 SToken" },
        {
          label: "Amount decreased each time",
          value: (Number(dataList[6]) / 1e18).toString(),
          unit: "1e18 SToken",
        },
        {
          label: "Maximum quantity of auction items",
          value: dataList[7],
          unit: "",
        },
        {
          label: "Total number of bidders",
          value: dataList[8],
          unit: "people",
        },
        {
          label: "Is the auction currently being activated",
          value: dataList[9],
          unit: "",
        },
        {
          label: "Is the auction currently being refunded",
          value: dataList[10],
          unit: "",
        },
      ]);
    }
  }, [auctionData]);

  useEffect(() => {
    async function fetchBlockTimestamp() {
      const web3 = new Web3(
        "https://mainnet.infura.io/v3/944d422c26d44000988fc92104bf51b8"
      );
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(latestBlockNumber);
      const timestamp = block.timestamp;
      setBlockTimestamp(timestamp);
    }
    fetchBlockTimestamp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchAuctionData();
      refetchAuctionIndex();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 格式化时间戳
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000);
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  return (
    <div>
        <TableContainer className="border-2 border-white mx-96 mt-10 py-5 pl-32 bg-gradient-to-r from-blue-800 via-blue-950 to-blue-800 rounded-lg">
          <Table size="lg">
            <TableCaption className="text-2xl mt-10 mx-64">Auction Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Parameter Name</Th>
                <Th isNumeric>Value</Th>
                <Th>Unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {auctionInfo.map((info, index) => (
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
