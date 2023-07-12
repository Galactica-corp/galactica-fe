import { HelpCard } from "entities/help-card";
import { Button } from "shared/ui/button";

export const Help = () => {
  return (
    <div className="grid grid-cols-2 gap-[2.18rem]">
      <HelpCard
        title="What do I need to get started?"
        className="!border-burntSienna"
      >
        <div className="mt-[2rem] font-light">
          <p className="mb-[0.7rem]">
            To start using Galactica Network, you need to have Metamask wallet
            connected and the Snap extension installed to it.
          </p>
          <p>
            The extension is needed to access the main features of the network -
            zkKYC, Reputation and Governance.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        title="How to get a KYC?"
        button={
          <Button
            theme="primaryTransparent"
            className="h-[2rem] w-[14.06rem] !font-antiqueLegacy text-[0.875rem] font-light normal-case"
          >
            Go to KYC provider list
          </Button>
        }
      >
        <div className="font-light">
          <p>
            If you didn&apos;t pass a KYC before, go to KYC providers list and
            initiate the procedure.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        title="I passed my KYC. What's next?"
        button={
          <Button
            theme="primary"
            className="h-[2rem] w-[14.06rem] !font-antiqueLegacy text-[0.875rem] font-light normal-case"
          >
            Upload KYC-KEY
          </Button>
        }
      >
        <div className="font-light">
          <p className="mb-[0.7rem]">
            If you passed a KYC, you should have the secret file from a KYC
            provider.
            <br /> Upload it to your Metamask to make it accessible to this
            portal.
          </p>
        </div>
      </HelpCard>
      <HelpCard
        title="What are the SBTs and why do I need one?"
        button={
          <Button
            theme="primaryTransparent"
            className="
              h-[2rem] w-[14.06rem] 
              !border-naturalGray/50 !p-0 
              !font-antiqueLegacy text-[0.875rem] font-light normal-case"
          >
            Non-published documents
          </Button>
        }
      >
        <div className="font-light">
          <p className="mb-[0.7rem]">
            After you&apos;ve passed KYC and uploaded it to the Metamask, it
            becomes visible to you and this application. But, nobody else can
            see it. The application will help you to generate your first SBT - a
            non-transferable NFT, containing proof that you are verified with a
            given KYC level.
          </p>
        </div>
      </HelpCard>
    </div>
  );
};
