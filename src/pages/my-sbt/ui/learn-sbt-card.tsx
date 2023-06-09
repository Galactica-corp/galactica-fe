import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { Card } from "shared/ui/card";
import { Link } from "shared/ui/link";
import learSbtCardUrl from "./learn-sbt-card.png";

export const LearnSbtCard = () => {
  return (
    <Card
      title="What are the SBTs?"
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${learSbtCardUrl})` }}
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
    </Card>
  );
};
