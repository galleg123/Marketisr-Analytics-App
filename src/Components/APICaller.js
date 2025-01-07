import { useRef, useEffect } from "react";
import { useAccountIds } from "./AccountIdProvider";

function APICaller() {
	const { accountIds } = useAccountIds();

	const accountIdsRef = useRef(accountIds);

	const formatDate = (date) => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = String(date.getFullYear()).slice(-2);

		return `${day}/${month}/${year}`;
	};

	const formatTime = (date) => {
		const hours = String(date.getHours()).padStart(2, "0"); // 24-hour format
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	const fetchAccount = async (kundeId) => {
		const today = new Date();
		const dateStop = today.toISOString().split("T")[0];
		const startDate = new Date();
		startDate.setDate(today.getDate() - 31);
		const dateStart = startDate.toISOString().split("T")[0];
		const access_token =
			"insert here";

		const baseUrl = `https://graph.facebook.com/v21.0/act_${kundeId}/insights`;
		const params = new URLSearchParams({
			access_token: access_token,
			fields: "account_name,actions,spend,video_avg_time_watched_actions,website_purchase_roas, video_p25_watched_actions, video_p50_watched_actions, video_p75_watched_actions,video_p100_watched_actions, cpc, ctr,impressions,reach, clicks",
			actions_breakdown: "action_type",
			level: "account",
			"time_range[since]": dateStart,
			"time_range[until]": dateStop,
		});
		try {
			console.log(`${baseUrl}?${params.toString()}`)
			const response = await fetch(`${baseUrl}?${params.toString()}`, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			if (!data.data[0]) {
				const backupResponse = await fetch(
					`https://graph.facebook.com/v21.0/act_${kundeId}?fields=name&access_token=${access_token}`,
					{ method: "GET" }
				);
				if (!backupResponse.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const backupData = await backupResponse.json();
				return backupData;
			}
			return data.data;
		} catch (error) {
			//console.error("Error fetching Facebook Insights", error);
			return 400;
		}
	};

	const addAccount = async (id) => {
		const today = new Date();
		const fetchedAccount = await fetchAccount(id);
		if (fetchedAccount !== 400) {
			const account = {};
			const tempAccount = fetchedAccount[0];
			account.date = formatDate(today);
			account.time = formatTime(today);
			if (!tempAccount) {
				account.account_name = fetchedAccount.name || "-";
				account.videoAvgWatch = "-";
				account.leads = "-";
				account.add_payment_info = "-";
				account.initiate_checkout = "-";
				account.link_click = "-";
				account.spend =  "-";
				account.spendPerLead = "-";
				account.video_views = "-";
				account.purchases = "-";
				account.add_to_cart = "-";
				account.p25 = "-";
				account.p50 = "-";
				account.p75 = "-";
				account.p100 = "-";
				account.roas = "-";
				account.ctr = "-";
				account.cpc = "-";
				account.impressions = "-";
				account.reach = "-";
			} else {
				account.account_name = tempAccount.account_name || "-";
				account.videoAvgWatch =
					tempAccount.video_avg_time_watched_actions
						? tempAccount.video_avg_time_watched_actions[0]
								?.value || "-"
						: "-";
				account.leads =
					parseInt(
						tempAccount.actions.find(
							(action) => action.action_type === "lead"
						)?.value
					) || "-";
				account.add_payment_info =
					parseInt(
						tempAccount.actions.find(
							(action) =>
								action.action_type === "add_payment_info"
						)?.value
					) || "-";
				account.initiate_checkout =
					parseInt(
						tempAccount.actions.find(
							(action) =>
								action.action_type === "initiate_checkout"
						)?.value
					) || "-";
				account.link_click =
					parseInt(
						tempAccount.actions.find(
							(action) => action.action_type === "link_click"
						)?.value
					) || "-";
				account.spend = tempAccount.spend
					? parseInt(tempAccount.spend) || "-"
					: "-";
				account.spendPerLead =
					account.leads > 0 && tempAccount.spend
						? account.spend / account.leads
						: "-";

				account.video_views =
					parseInt(
						tempAccount.actions.find(
							(action) => action.action_type === "video_view"
						)?.value
					) || "-";
				account.purchases =
					parseInt(
						tempAccount.actions.find(
							(action) => action.action_type === "purchase"
						)?.value
					) || "-";
				account.add_to_cart =
					parseInt(
						tempAccount.actions.find(
							(action) => action.action_type === "add_to_cart"
						)?.value
					) || "-";
				account.p25 = tempAccount.video_p25_watched_actions
					? parseInt(
							tempAccount.video_p25_watched_actions[0]?.value
					  ) || "-"
					: "-";
				account.p50 = tempAccount.video_p50_watched_actions
					? parseInt(
							tempAccount.video_p50_watched_actions[0]?.value
					  ) || "-"
					: "-";
				account.p75 = tempAccount.video_p75_watched_actions
					? parseInt(
							tempAccount.video_p75_watched_actions[0]?.value
					  ) || "-"
					: "-";
				account.p100 = tempAccount.video_p100_watched_actions
					? parseInt(
							tempAccount.video_p100_watched_actions[0]?.value
					  ) || "-"
					: "-";
				account.roas = tempAccount.website_purchase_roas
					? parseFloat(tempAccount.website_purchase_roas[0]?.value) ||
					  "-"
					: "-";
				account.ctr = tempAccount.ctr
					? parseFloat(tempAccount.ctr)
					: "-";
				account.cpc = tempAccount.cpc
					? parseFloat(tempAccount.cpc)
					: "-";
				account.impressions = tempAccount.impressions
					? parseInt(tempAccount.impressions)
					: "-";
				account.reach = tempAccount.reach
					? parseInt(tempAccount.reach)
					: "-";
			}
			localStorage.setItem(`${id}`, JSON.stringify(account));
		}
	};

	const mapAccounts = async () => {
		const accountPromises = accountIdsRef.current.map(async (id) => {
			await addAccount(id);
		});
		await Promise.all(accountPromises);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			mapAccounts();
		}, 900000);

		mapAccounts();

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const missingIds = accountIds.filter(
			(id) => !accountIdsRef.current.includes(id)
		);

		missingIds.map(async (id) => {
			await addAccount(id);
		});
		accountIdsRef.current = accountIds;
	}, [accountIds]);

	return <></>;
}

export default APICaller;
