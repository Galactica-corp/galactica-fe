import { default as CheckGrayIcon } from "shared/icons/check-gray.svg?react";
import { useGetSnapQuery, useSbtsQuery, useZkCerts } from "shared/snap";

import { default as ProgressArrowIcon } from "./images/progress-arrow.svg?react";
import progressGrayUrl from "./images/progress-gray.png";
import progressOrangeUrl from "./images/progress-orange.png";

const STEPS_MAP = [
  {
    name: "Install MetaMask",
    status: "finished",
    position: "translate-x-[-29.6rem]",
  },
  {
    name: "Install Snap",
    status: "finished",
    position: "translate-x-[-11.6rem]",
  },
  {
    name: "Get your zkKYC",
    status: "unfinished",
    position: "translate-x-[7.4rem]",
  },
  {
    name: "Generate zkKYC Proof",
    status: "unfinished",
    position: "translate-x-[28.4rem]",
  },
];

export function OnboardingProgress() {
  const [zkCerts] = useZkCerts();

  const snapQuery = useGetSnapQuery();

  const query = useSbtsQuery({
    extraEnabled: Boolean(snapQuery?.data && zkCerts?.length !== 0),
    select: ({ sbts }) => sbts,
  });

  if (
    (snapQuery.isLoading && snapQuery.isInitialLoading) ||
    (query.isLoading && query.isInitialLoading)
  )
    return null;

  let currentStep = 0;

  if (!query.data) currentStep = 3;
  if (zkCerts?.length === 0) currentStep = 2;
  if (!snapQuery.data) currentStep = 1;

  if (!currentStep) return null;

  return (
    <div className="fixed bottom-0 z-10 w-full space-y-4 bg-transparent pt-[0.8rem]">
      <div className="flex w-full items-center justify-center gap-x-9">
        {STEPS_MAP.map((step, i) => (
          <div className="flex items-center gap-9 transition-colors" key={i}>
            <div
              className={`
                flex items-center
                ${
                  currentStep === i + 1 ? "text-burntSienna" : "text-grayNickel"
                }
              `}
            >
              <div className="flex items-center gap-2.5 text-[1.25rem]">
                {step.name}
                <div className="w-[2.1rem]">
                  {i + 1 < currentStep ? (
                    <CheckGrayIcon className="w-full" />
                  ) : (
                    <div
                      className={`
                    rounded-[0.165rem] border p-1 font-publicoTextMono text-[0.875rem] leading-none
                    ${
                      currentStep === i + 1
                        ? "border-burntSienna/30"
                        : "border-grayNickel"
                    }
                  `}
                    >
                      {i + 1}/4
                    </div>
                  )}
                </div>
              </div>
            </div>
            {i !== 3 && <ProgressArrowIcon />}
          </div>
        ))}
      </div>
      <div
        className="h-[4px] w-full bg-repeat-x"
        style={{
          backgroundImage: `url(${progressGrayUrl})`,
          backgroundColor: "#F9F8F6",
        }}
      >
        <div
          className={`relative right-1/2 h-[4px] w-full bg-repeat-x transition-transform ${
            STEPS_MAP[currentStep - 1].position
          }`}
          style={{
            backgroundImage: `url(${progressOrangeUrl})`,
            backgroundColor: "#F5B3A6",
          }}
        >
          <div className="absolute bottom-0 right-0 h-[0.7rem] w-[0.187rem] bg-salmon">
            <div className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-salmon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
