import { Tooltip } from "react-tooltip";
import { ReactComponent as CardSpinnerIcon } from "shared/icons/card-spinner.svg";
import { ReactComponent as InfoOrangeIcon } from "shared/icons/info-orange.svg";
import { Link } from "shared/ui/link";
import { cardDefaultStyle } from "shared/utils";
import questionKYCCardBgUrl from "./images/question-kyc-card-bg.svg";

export function QuestionKYCCard() {
  const id = Math.random().toString(36).substring(2);

  return (
    <div
      className={`${cardDefaultStyle} flex-col justify-between bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${questionKYCCardBgUrl})` }}
    >
      <div>
        <div className="text-[1.75rem] font-light">Can’t find your KYC?</div>
        <Link href="https://google.com" target="_blank" rel="noreferrer">
          Learn More about KYC{" "}
          <InfoOrangeIcon
            className="relative ml-[0.31rem]"
            data-tooltip-id={`question-kyc-tooltip-${id}`}
            data-tooltip-content={"TODO some text"}
          />
        </Link>
      </div>
      <div className="flex items-center justify-end text-right text-[0.875rem] text-naturalGray">
        <CardSpinnerIcon className="mr-[0.5rem] animate-spin" /> Update after 35
        seconds
      </div>
      <Tooltip
        className="react-tooltip-custom"
        id={`question-kyc-tooltip-${id}`}
      />
    </div>
  );
}
