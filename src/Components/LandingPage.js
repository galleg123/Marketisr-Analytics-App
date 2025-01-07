import styles from "./LandingPage.module.css";
import AddAccountId from "./AddAccountId/AddAccountId";
import KortHolder from "./KortHolder/KortHolder";
import TimeGraphHolder from "./TimeGraphHolder/TimeGraphHolder";
import RoasGraphHolder from "./RoasGraphHolder/RoasGraphHolder";
import logo from "../imgs/MarketisrAppLogo.png"

const LandingPage = () => {
	return (
		<div className={styles.landingPage}>
			<AddAccountId />
			<img src={logo} className={styles.logo} />
			<div className={styles.line}></div>
				<KortHolder />
				<TimeGraphHolder />
				<RoasGraphHolder />
		</div>
	);
};

export default LandingPage;
