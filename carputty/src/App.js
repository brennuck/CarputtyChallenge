import React, { useState } from "react";
import "./App.scss";

function App() {
	let [money, setMoney] = useState(5000);
	let [moneyHave, setMoneyHave] = useState(0);
	let [donors, setDonors] = useState(0);
	let [donation, setDonation] = useState(5);
	let [moneyError, setMoneyError] = useState(false);

	function submitDonation(event) {
		event.preventDefault();

		if (donation >= 5) {
			setMoneyError(false);
			setMoneyHave((moneyHave += donation));
			setMoney((money -= donation));
			setDonors((donors += 1));
			calculate();
		} else {
			setMoneyError(true);
		}
	}

	function calculate() { // calculates the percatage of money completed
		return (100 * moneyHave) / 5000;
	}

	const filler = { // styling for the progress bar
		height: "100%",
		width: `${calculate()}%`,
		maxWidth: "100%",
		backgroundColor: "#17CCA2",
		borderRadius: "inherit"
	};

	return (
		<div className="App">

			<div className="stillNeeded">
				{money > 0 ? (
					<p>
						<span className="empblue">${money}</span> still needed
						to fund this project
					</p>
				) : (
					<p>This project has been funded! 🎊</p>
				)}
			</div>

			<div className="progressBar">
				<div style={filler}>
					<span></span>
				</div>
			</div>

			<div className="Box">

				<div className="daysLeft">
					{money > 0 ? (
						<h2>Only four days left to fund this project</h2>
					) : (
						<h2>This project has been funded with a total of ${moneyHave}</h2>
					)}
				</div>

				<div className="donors">
					{donors === 0 ? ( // if no one has donated yet then show the 'first donator message'
						<p>
							Be the <span className="emp">first</span> to support
							this project.
						</p>
					) : (
						<p>
							Join the <span className="emp">{donors}</span> other
							donors who have already supported this project.
						</p>
					)}
				</div>

				<div className="give">
					<form onSubmit={submitDonation}>
						<div className="moneySign">
							$
							<input
								type="integer"
								onChange={(event) =>
									setDonation(Number(event.target.value))
								}
							/>
							<button type="submit">Give Now</button>
						</div>
					</form>
				</div>

			</div>

			<div className="moneyError">
				{moneyError === true ? ( // if there is a error then show error message
					<div className="moneyError">
						<p>Any given donation cannot be below $5</p>
					</div>
				) : (
					<div></div>
				)}
			</div>

		</div>
	);
}

export default App;
