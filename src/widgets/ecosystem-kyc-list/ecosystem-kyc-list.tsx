import { useState } from "react";
import {
  EcosystemKYCItem,
  EcosystemKYCItemT,
} from "entities/ecosystem-kyc-item/ecosystem-kyc-item";
import { Tab } from "shared/ui/tab";

const TABS_MAP = [
  { name: "no-kyc", title: "No KYC required" },
  { name: "available-basic", title: "Available for Basic KYC" },
  { name: "available-advanced", title: "Available for Advanced KYC" },
];

export function EcosystemKycList() {
  const [currentTab, setCurrentTab] = useState(TABS_MAP[0].name);

  const changeTab = (tabName: string) => () => {
    setCurrentTab(tabName);
  };
  // TODO add filter for tabs when api will be
  return (
    <div>
      <div className="mb-[1.625rem] space-x-[2.185rem]">
        {TABS_MAP.map((tab) => (
          <Tab
            onClick={changeTab(tab.name)}
            key={tab.name}
            isActive={tab.name === currentTab}
          >
            {tab.title}
          </Tab>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-[1.56rem]">
        {MOCK_KYC_LIST.map((ecosystem: EcosystemKYCItemT, index: number) => (
          <EcosystemKYCItem key={index} {...ecosystem} />
        ))}
      </div>
    </div>
  );
}

const MOCK_KYC_LIST: Array<EcosystemKYCItemT> = [
  {
    name: "Syntetica",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "Incentives",
  },
  {
    name: "Syntetica",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "Incentives",
  },
  {
    name: "2inch",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "DEX",
  },
  {
    name: "Finger protocol",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "Bridge",
  },
  {
    name: "Inuswap",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "Web3",
  },
  {
    name: "Hehe",
    logo: "",
    bg: "",
    link: "https://google.com",
    social: [
      { name: "twitter", link: "https://google.com" },
      { name: "discord", link: "https://google.com" },
      { name: "telegram", link: "https://google.com" },
      { name: "medium", link: "https://google.com" },
    ],
    tag: "Tool",
  },
];
