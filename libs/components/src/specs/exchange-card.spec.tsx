import React from "react";
import { render } from "@testing-library/react";
import { ExchangeCard } from "../lib/exchange-card";
import { CardColors } from "../lib/colour-select";

const testExchange = {
  id: "123",
  name: "Test Exchange",
  colour: 1,
  userPermissions: [{ id: "111" }],
  instruments: [{ name: "ABCD" }],
};

const multiUserExchange = {
  id: "456",
  name: "Multi User Exchange",
  colour: 2,
  userPermissions: [{ id: "111" }, { id: "222" }, { id: "333" }],
  instruments: [{ name: "AAA" }],
};

const threeInstrumentExchange = {
  id: "789",
  name: "Three Exchange",
  colour: 3,
  userPermissions: [{ id: "222" }],
  instruments: [{ name: "RAWR" }, { name: "POGG" }, { name: "MMG" }],
};

const fourInstrumentExchange = {
  id: "128",
  name: "Four Exchange",
  colour: 4,
  userPermissions: [{ id: "333" }],
  instruments: [
    { name: "NZT" },
    { name: "PURR" },
    { name: "SPOG" },
    { name: "FFA" },
  ],
};

const fiveInstrumentExchange = {
  id: "256",
  name: "Five Exchange",
  colour: 5,
  userPermissions: [{ id: "333" }],
  instruments: [
    { name: "ROCK" },
    { name: "LAMP" },
    { name: "RNG" },
    { name: "EPG" },
    { name: "SSAP" },
  ],
};

describe("Exchange Card", () => {
  it("render an exchange card with 1 user and 1 instrument", () => {
    const { getByText } = render(
      <ExchangeCard
        key={testExchange.id}
        colour={CardColors[1]}
        name={testExchange.name}
        currentInstruments={testExchange.instruments.map((instrument) => ({
          name: instrument.name,
          type: "",
        }))}
        participants={testExchange.userPermissions.length}
        isAddCard={false}
        id={testExchange.id}
      />,
    );
    expect(getByText("Test Exchange")).toBeDefined();
    expect(getByText("$ABCD")).toBeDefined();
    expect(getByText("1 Participant")).toBeDefined();
  });

  it("render an exchange card with 3 users and 1 instrument", () => {
    const { getByText } = render(
      <ExchangeCard
        key={multiUserExchange.id}
        colour={CardColors[2]}
        name={multiUserExchange.name}
        currentInstruments={multiUserExchange.instruments.map((instrument) => ({
          name: instrument.name,
          type: "",
        }))}
        participants={multiUserExchange.userPermissions.length}
        isAddCard={false}
        id={multiUserExchange.id}
      />,
    );
    expect(getByText("Multi User Exchange")).toBeDefined();
    expect(getByText("$AAA")).toBeDefined();
    expect(getByText("3 Participants")).toBeDefined();
  });

  it("render an exchange card with 1 user and 3 instruments", () => {
    const { getByText } = render(
      <ExchangeCard
        key={threeInstrumentExchange.id}
        colour={CardColors[3]}
        name={threeInstrumentExchange.name}
        currentInstruments={threeInstrumentExchange.instruments.map(
          (instrument) => ({
            name: instrument.name,
            type: "",
          }),
        )}
        participants={threeInstrumentExchange.userPermissions.length}
        isAddCard={false}
        id={threeInstrumentExchange.id}
      />,
    );
    expect(getByText("Three Exchange")).toBeDefined();
    expect(getByText("$RAWR")).toBeDefined();
    expect(getByText("$POGG")).toBeDefined();
    expect(getByText("$MMG")).toBeDefined();
    expect(getByText("1 Participant")).toBeDefined();
  });

  it("render an exchange card with 1 user and 4 instruments", () => {
    const { getByText, queryByText } = render(
      <ExchangeCard
        key={fourInstrumentExchange.id}
        colour={CardColors[4]}
        name={fourInstrumentExchange.name}
        currentInstruments={fourInstrumentExchange.instruments.map(
          (instrument) => ({
            name: instrument.name,
            type: "",
          }),
        )}
        participants={fourInstrumentExchange.userPermissions.length}
        isAddCard={false}
        id={fourInstrumentExchange.id}
      />,
    );
    expect(getByText("Four Exchange")).toBeDefined();
    expect(getByText("$NZT")).toBeDefined();
    expect(getByText("$PURR")).toBeDefined();
    expect(getByText("$SPOG")).toBeDefined();
    expect(queryByText("$FFA")).toBeNull();
    expect(getByText("and 1 other instrument...")).toBeDefined();
    expect(getByText("1 Participant")).toBeDefined();
  });

  it("render an exchange card with 1 user and 5 instruments", () => {
    const { getByText, queryByText } = render(
      <ExchangeCard
        key={fiveInstrumentExchange.id}
        colour={CardColors[5]}
        name={fiveInstrumentExchange.name}
        currentInstruments={fiveInstrumentExchange.instruments.map(
          (instrument) => ({
            name: instrument.name,
            type: "",
          }),
        )}
        participants={fiveInstrumentExchange.userPermissions.length}
        isAddCard={false}
        id={fiveInstrumentExchange.id}
      />,
    );
    expect(getByText("Five Exchange")).toBeDefined();
    expect(getByText("$ROCK")).toBeDefined();
    expect(getByText("$LAMP")).toBeDefined();
    expect(getByText("$RNG")).toBeDefined();
    expect(queryByText("$EPG")).toBeNull();
    expect(queryByText("$SSAP")).toBeNull();
    expect(getByText("and 2 other instruments...")).toBeDefined();
    expect(getByText("1 Participant")).toBeDefined();
  });
});
