import { default as InfoOrangeIcon } from "shared/icons/info-orange.svg?react";
import { Card as UICard } from "shared/ui/card";

import learnCardUrl from "../assets/learn-card.png";

export const Card = () => {
  return (
    <UICard
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${learnCardUrl})` }}
      title="What are the SBTs?"
    >
      <a
        className="link mt-2.5"
        href="https://docs.galactica.com/galactica-developer-documentation/galactica-concepts/zero-knowledge-kyc/verification-sbt"
        rel="noreferrer"
        target="_blank"
      >
        Learn More about SBT{" "}
        <InfoOrangeIcon
          className="relative ml-[0.31rem]"
          data-tooltip-content={"TODO some text"}
          data-tooltip-id={`learn-kyc-link`}
        />
      </a>
    </UICard>
  );
};
