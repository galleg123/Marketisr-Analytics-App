import { useState, useEffect } from "react";
import styles from './GetAds.module.css'

const GetAds = ({ id }) => {

    const [ads, setAds] = useState([]);

	const getAds = async () => {
		const today = new Date();
		const dateStop = today.toISOString().split("T")[0];
		const startDate = new Date();
		startDate.setDate(today.getDate() - 31);
		const dateStart = startDate.toISOString().split("T")[0];
		const access_token =
			"insert here";
		const baseUrl = `https://graph.facebook.com/v21.0/act_${id}/insights`;

		const params = new URLSearchParams({
			access_token: access_token,
			fields: "campaign_name,ad_name,actions,spend,video_avg_time_watched_actions,website_purchase_roas, cpc, ctr,impressions,reach, clicks,frequency",
			actions_breakdown: "action_type",
			level: "ad",
			"time_range[since]": dateStart,
			"time_range[until]": dateStop,
		});
		try {
			const response = await fetch(`${baseUrl}?${params.toString()}`, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data.data;
		} catch (error) {
			//console.error("Error fetching Facebook Insights", error);
			return 400;
		}
    };
    

	useEffect(() => {
		const fetchAds = async () => {
			const tempAds = await getAds();
			if (tempAds === 400) {
				setAds([]);
				return;
			}
			setAds(tempAds);
		};

		fetchAds();
    }, [])


	const adSetup = (ad) => {
		if (!ad) {
			return <></>
		}
		
		const purchases = ad.actions ? ad.actions.find((action) => action.action_type === "purchase")?.value || "-" : "-";
		const addToCart = ad.actions ? ad.actions.find((action) => action.action_type === "add_to_cart")?.value || "-" : "-";
		const landingPage = ad.actions ? ad.actions.find((action) => action.action_type === "landing_page_view")?.value || "-" : "-";
		const leads = ad.actions ? ad.actions.find((action) => action.action_type === "lead")?.value || "-" : "-";
		const paymentInfo = ad.actions ? ad.actions.find((action) => action.action_type === "add_payment_info")?.value || "-" : "-";
		const initCheckout = ad.actions ? ad.actions.find((action) =>	action.action_type === "initiate_checkout")?.value || "-" : "-";

        return (
			<div className={styles.ad}>
				<div data-tooltip={ad.ad_name ? ad.ad_name : "-"} className={styles.hoverEffect}>{ad.ad_name ? ad.ad_name : "-"}</div>
				<div data-tooltip={ad.campaign_name ? ad.campaign_name : "-"} className={styles.hoverEffect}>{ad.campaign_name ? ad.campaign_name : "-"}</div>
				<div>{ad.spend ? ad.spend : "-"}</div>
				<div>{purchases}</div>
				<div>{addToCart}</div>
				<div>{landingPage}</div>
				<div>{leads}</div>
				<div>{paymentInfo}</div>
				<div>{initCheckout}</div>
				<div>{ad.video_avg_time_watched_actions ? ad.video_avg_time_watched_actions[0]?.value: "-"}</div>
				<div>{ad.cpc ? parseFloat(ad.cpc).toFixed(2) : "-" }</div>
				<div>{ad.ctr ? parseFloat(ad.ctr).toFixed(2) : "-" }</div>
				<div>{ad.impressions ? ad.impressions : "-"}</div>
				<div>{ad.reach ? ad.reach : "-"}</div>
				<div>{ad.website_purchase_roas ? parseInt(ad.website_purchase_roas[0]?.value).toFixed(2) : "-"}</div>
			</div>
        )
    }

    return (<>
		{ads.map((ad, index) => {
				return adSetup(ad)
		}
			)}
    </>)
};


export default GetAds;