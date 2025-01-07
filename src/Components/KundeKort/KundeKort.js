import { useEffect, useState } from "react";

import styles from "./KundeKort.module.css";
import { useNavigate } from "react-router-dom";

function KundeKort({ id }) {
	const navigate = useNavigate();
	const [account, setAccount] = useState(null);

	useEffect(() => {
		const getAccount = () => {
			const localAccount = localStorage.getItem(`${id}`);
			setAccount(JSON.parse(localAccount));
		};
		const interval = setTimeout(() => {
			getAccount();
		}, 65000);
		getAccount();

		return () => clearInterval(interval);
	}, []);

	const handleNavigate = () => {
		navigate(`/account/${id}`);
	};

	return (
		<div className={styles.kort} onClick={handleNavigate}>
			{account ? (
				<>
					<h1>{account.account_name || "-"}</h1>
					<h2>
						Leads: {account.leads || "-"} <br />
						Sales: {account.purchases || "-"} <br />
						Spend: {account.spend || "-"}
						<br />
						Spend per Lead:{" "}
						{account.spendPerLead && account.spendPerLead !== "-"
							? account.spendPerLead.toFixed(2)
							: "-"}
						<br />
						Average ad time watched: {account.videoAvgWatch ||
							"-"}{" "}
						sec.
					</h2>
				</>
			) : (
				<>
					<h1>Loading</h1>
					<h2>
						Leads: <br />
						Sales: <br />
						Spend:
						<br />
						Spend per Lead:
						<br />
						Average ad time watched:{" "}
					</h2>
				</>
			)}
			{account ? (
				<>
					<p className={styles.date}>{account.date || "-"}</p>
					<p className={styles.time}>{account.time || "-"}</p>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

export default KundeKort;
