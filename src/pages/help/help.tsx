import { HelpCard } from "entities/help-card";
import { Button } from "shared/ui/button";

export const Help = () => {
  return (
    <div className="grid grid-cols-2 gap-[2.18rem]">
      <HelpCard
        className="!border-burntSienna"
        title="What do I need to get started?"
      >
        <div className="mt-8 font-light">
          <p className="mb-[0.7rem]">
            To start using Galactica Network, you need to have MetaMask wallet
            connected and the Snap extension installed to it.
          </p>
          <p>
            The extension is needed to access the main features of the network -
            zkKYC, Reputation and Governance.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        button={
          <Button
            className="h-8 w-[14.06rem] !font-antiqueLegacy text-[0.875rem] font-light normal-case"
            theme="primaryTransparent"
          >
            Go to zkKYC provider list
          </Button>
        }
        title="How to get a zkKYC?"
      >
        <div className="font-light">
          <p>
            If you didn&apos;t pass a zkKYC before, go to zkKYC providers list
            and initiate the procedure.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        button={
          <Button
            className="h-8 w-[14.06rem] !font-antiqueLegacy text-[0.875rem] font-light normal-case"
            theme="primary"
          >
            Upload zkKYC-KEY
          </Button>
        }
        title="I passed my zkKYC. What's next?"
      >
        <div className="font-light">
          <p className="mb-[0.7rem]">
            If you passed a zkKYC, you should have the secret file from a zkKYC
            provider.
            <br /> Upload it to your MetaMask to make it accessible to this
            portal.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        button={
          <Button
            className="
              h-8 w-[14.06rem] 
              !border-naturalGray/50 !p-0 
              !font-antiqueLegacy text-[0.875rem] font-light normal-case"
            theme="primaryTransparent"
          >
            Non-published documents
          </Button>
        }
        title="What are the SBTs and why do I need one?"
      >
        <div className="font-light">
          <p className="mb-[0.7rem]">
            After you&apos;ve passed zkKYC and uploaded it to the MetaMask, it
            becomes visible to you and this application. But, nobody else can
            see it. The application will help you to generate your first SBT - a
            non-transferable NFT, containing proof that you are verified with a
            given zkKYC level.
          </p>
        </div>
      </HelpCard>
    </div>
  );
};
