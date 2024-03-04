import { useState } from "react";
import {
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import MintFakeBAYC from "./MintFakeBAYC";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CalleteralPool from "./CalleteralPool";
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
                activeTab === 0 ? "border-b-4 border-teal-200 text-teal-200" : ""
              }`}
            >
              Your status
            </Tab>
            <Tab
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 1 ? "border-b-4 border-teal-200 text-teal-200" : ""
              }`}
            >
              Collateral pool   
            </Tab>
            <Tab
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 2 ? "border-b-4 border-teal-200 text-teal-200" : ""
              }`}
            >
              Dutch Auction
            </Tab>
          </div>
          <ConnectButton />
        </TabList>
        <TabPanels>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            <MintFakeBAYC />
            <CalleteralPool />
          </TabPanel>
          <TabPanel>
            <p>Three!</p>
          </TabPanel>
        </TabPanels>
      </ChakraTabs>
    </div>
  );
}
