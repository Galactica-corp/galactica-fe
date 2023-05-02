import { Tooltip } from "react-tooltip";
import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { Link } from "shared/ui/link";
import { cardDefaultStyle } from "shared/utils";
import questionSBTCardBgUrl from "./images/question-sbt-card-bg.svg";

export function QuestionSBTCard() {
  const id = Math.random().toString(36).substring(2);

  return (
    <div
      className={`${cardDefaultStyle} flex-col justify-between bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${questionSBTCardBgUrl})` }}
    >
      <div>
        <div className="mb-[0.6rem] text-[1.75rem] font-light">
          What are the SBTs?
        </div>
        <Link href="https://google.com" target="_blank" rel="noreferrer">
          Learn More about SBT{" "}
          <InfoOrangeIcon
            className="relative ml-[0.31rem]"
            data-tooltip-id={`question-kyc-tooltip-${id}`}
            data-tooltip-content={"TODO some text"}
          />
        </Link>
      </div>
      <Tooltip
        className="react-tooltip-custom"
        id={`question-kyc-tooltip-${id}`}
      />
    </div>
  );
}
