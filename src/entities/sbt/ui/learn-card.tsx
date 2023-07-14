import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { Card as UICard } from "shared/ui/card";
import learnCardUrl from "../assets/learn-card.png";

export const Card = () => {
  return (
    <UICard
      title="What are the SBTs?"
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${learnCardUrl})` }}
    >
      <a
        className="link mt-2.5"
        target="_blank"
        href="https://docs.galactica.com/galactica-developer-documentation/galactica-concepts/zero-knowledge-kyc/verification-sbt"
        rel="noreferrer"
      >
        Learn More about SBT{" "}
        <InfoOrangeIcon
          data-tooltip-id={`learn-kyc-link`}
          data-tooltip-content={"TODO some text"}
          className="relative ml-[0.31rem]"
        />
      </a>
    </UICard>
  );
};
