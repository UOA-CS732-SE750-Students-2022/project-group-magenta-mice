import { useEmoji } from "@simulate-exchange/hooks";
import cx from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { ReactComponent as PlusSign } from "../../../../../libs/assets/src/lib/plus-sign.svg";
import CreateExchangeModal, {
  useCreateExchangeModalController,
} from "./CreateExchangeModal";

export interface ExchangeCardProps {
  name?: string;
  colour?: string;
  isAddCard: boolean;
  currentInstruments?: { name: string; type: string }[];
  profitLoss?: number;
  participants?: number;
  id?: string;
}

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  name = "",
  colour: color = "bg-gray-600",
  isAddCard,
  currentInstruments = [
    {
      name: "ABCD",
      type: "Bond",
    },
    {
      name: "FGGH",
      type: "Bond",
    },
    {
      name: "AAPL",
      type: "Bond",
    },
    {
      name: "QQQ",
      type: "Stock",
    },
  ],
  profitLoss = 2000,
  participants = 2,
  id,
}) => {
  const [isOpen, setOpen] = useState(false);

  const ShakeHands = useEmoji("🤝", "1.75rem");
  const GraphEmoji = useEmoji(profitLoss >= 0 ? "📈" : "📉", "1rem");

  const formatMoney = useCallback((money: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(money);
  }, []);

  const router = useRouter();

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const ModalCreateExchange = (
    <CreateExchangeModal
      useController={useCreateExchangeModalController}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
    />
  );

  if (isAddCard) {
    return (
      <div id={id}>
        {ModalCreateExchange}
        <div
          className={cx(
            color,
            "h-48 w-full cursor-pointer rounded-lg p-4 text-2xl font-semibold text-gray-200 transition-all hover:brightness-110",
          )}
          onClick={handleOpenModal}
        >
          <PlusSign className="h-12 w-12" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={cx(
            color,
            "h-48 w-full cursor-pointer rounded-lg p-4 transition-all hover:brightness-110",
          )}
          onClick={() => router.push("/exchange/" + id + "/settings")}
        >
          <div className="flex h-full w-full justify-between px-2">
            <div className="flex h-full w-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-200 lg:text-2xl">
                    {name}
                  </div>
                </div>
                <div className="ml-4">
                  {currentInstruments.slice(0, 3).map((instrument) => (
                    <li
                      key={instrument.name}
                      className="font-medium text-gray-200"
                    >
                      ${instrument.name}
                    </li>
                  ))}
                  {currentInstruments.length > 3 && (
                    <div className="ml-6 text-sm text-gray-200">
                      and {currentInstruments.length - 3} other instrument
                      {currentInstruments.length - 3 > 1 ? "s" : ""}...
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <GraphEmoji />
                  <span className="font-bold text-gray-200">
                    {formatMoney(profitLoss)} P/L
                  </span>
                </div>
                <div className="flex items-center gap-x-2 font-medium text-gray-200">
                  <ShakeHands /> {participants}{" "}
                  {participants < 2 ? "Participant" : "Participants"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ExchangeCard;
