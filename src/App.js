import { useState } from "react";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [mortgageType, setMortgageType] = useState("fixed");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [error, setError] = useState("");

  const calculateMortgage = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      setError("Please fill in all fields.");
      setMonthlyPayment(null);
      return;
    }

    setError("");

    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const totalPayments = loanTerm * 12;

    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "420px",
        margin: "auto",
      }}
    >
      <h1>Mortgage Calculator</h1>
      <p>Estimate your monthly mortgage repayments.</p>

      <div style={{ marginBottom: "12px" }}>
        <label>Loan Amount (£)</label>
        <br />
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="e.g. 200000"
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Interest Rate (%)</label>
        <br />
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="e.g. 5"
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Mortgage Type</label>
        <br />
        <select
          value={mortgageType}
          onChange={(e) => setMortgageType(e.target.value)}
        >
          <option value="fixed">Fixed Rate</option>
          <option value="variable">Variable Rate</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Loan Term (years)</label>
        <br />
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          placeholder="e.g. 25"
        />
      </div>

      <button onClick={calculateMortgage}>Calculate</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {monthlyPayment && (
        <div style={{ marginTop: "20px" }}>
          <h3>Estimated Monthly Payment</h3>
          <p>
            <strong>£{monthlyPayment}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "#555" }}>
            Mortgage type selected: {mortgageType}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
