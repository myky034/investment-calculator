import React, { useState } from "react";
import Header from "./UI/Header/Header";
import logo from "./assets/investment-calculator-logo.png";
import Investments from "./Investment/Investments";
import NewInvestment from "./NewInvestment/NewInvestment";

function App() {
  const [userInput, setUserInput] = useState("");

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  let currentSavings = +userInput["current-savings"];
  const yearlyContribution = +userInput["yearly-contribution"];
  const expectedReturn = +userInput["expected-return"] / 100;
  const duration = +userInput["duration"];

  if (userInput) {
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header logoImg={logo} />

      <NewInvestment onCalculate={calculateHandler} />

      {!userInput && (
        <p style={{ textAlign: "center" }}>No investments found.</p>
      )}
      {userInput && (
        <Investments
          data={yearlyData}
          initialUserInput={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
