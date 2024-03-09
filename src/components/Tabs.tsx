import { useState } from "react";
import {
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ColleteralPool from "./ColleteralPool";
import UserStatus from "./UserStatus";
import AuctionStatus from "./AuctionStatus";
import AuctionInfo from "./AuctionInfo";
import Bid from "./Bid";
export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <ChakraTabs
        variant="unstyled"
        index={activeTab}
        onChange={(index) => setActiveTab(index)}
      >
        <TabList className="bg-slate-500 w-full px-5 pt-5 flex justify-between items-center">
          <div className="flex flex-row">
            <Tab
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 0
                  ? "border-b-4 border-teal-200 text-teal-200"
                  : ""
              }`}
            >
              YOUR STATUS
            </Tab>
            <Tab
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 1
                  ? "border-b-4 border-teal-200 text-teal-200"
                  : ""
              }`}
            >
              COLLATERAL POOL
            </Tab>
            <Tab
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 2
                  ? "border-b-4 border-teal-200 text-teal-200"
                  : ""
              }`}
            >
              DUTCH AUCTION
            </Tab>
          </div>
          <ConnectButton />
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserStatus />
          </TabPanel>
          <TabPanel>
            <ColleteralPool />
          </TabPanel>
          <TabPanel>
            <AuctionStatus />
            <AuctionInfo />
            <Bid />
          </TabPanel>
        </TabPanels>
      </ChakraTabs>
    </div>
  );
}
