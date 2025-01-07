import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAccountIds } from "./AccountIdProvider";
import Cookies from 'js-cookie'
import styles from "./AccountPage.module.css"
import { useEffect, useState } from "react";
import logo from '../imgs/MarketisrAppLogo.png'
import AccountPageGraph from './AccountPageGraph/AccountPageGraph'
import GetAds from './GetAds/GetAds'

const AccountPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState(null)
    const { accountIds, setAccountIds } = useAccountIds();

    useEffect(() => {
        const acc = JSON.parse(localStorage.getItem(`${id}`))
        setAccount(acc);
    }, [])

    const home = () => {
        navigate('/');
    }

    const removeAccount = () => {
        const newAccountIds = accountIds.filter((acc_id) => acc_id !== id);
        setAccountIds(newAccountIds);
        Cookies.set('accountIds', JSON.stringify(newAccountIds), { expires: 365 * 10 });
        navigate('/');
    }


    return (
        <div className={styles.container}>
            <svg width="51" height="57" viewBox="0 0 51 57" xmlns="http://www.w3.org/2000/svg" className={styles.trash}  onClick={removeAccount}>
<path fillRule="evenodd" clipRule="evenodd" d="M30.3606 4.61042C28.7418 3.88906 26.6888 3.71567 25.2917 3.80804L25.2294 3.81216H25.1669C21.6349 3.81216 19.975 4.74962 19.2199 5.53662C18.5302 6.25548 18.379 7.06834 18.4183 7.59659H32.7929C32.7189 6.88487 32.4785 6.35571 32.1605 5.93863C31.7568 5.4091 31.151 4.96264 30.3606 4.61042ZM16.4884 2.91578C15.0666 4.3976 14.5935 6.15905 14.6299 7.59659H2.48253C1.43719 7.59659 0.589783 8.444 0.589783 9.48934C0.589783 10.5347 1.43719 11.3821 2.48253 11.3821H4.52011L7.47026 53.592C7.60311 55.4928 9.18379 56.9668 11.0892 56.9668H24.14H25.1652H26.0328H27.058H40.1088C42.0142 56.9668 43.5949 55.4928 43.7277 53.592L46.6779 11.3821H48.697C49.7424 11.3821 50.5898 10.5347 50.5898 9.48934C50.5898 8.444 49.7424 7.59659 48.697 7.59659H36.5892C36.5032 6.04764 35.9953 4.72481 35.1709 3.6435C34.2824 2.47811 33.099 1.6864 31.9014 1.1527C29.5719 0.11463 26.8899 -0.082558 25.1055 0.0267526C20.974 0.0376401 18.1842 1.14843 16.4884 2.91578ZM42.8832 11.3821H8.31483L11.2363 53.1813H24.14H25.1652H26.0328H27.058H39.9617L42.8832 11.3821ZM27.5615 19.5051C27.5615 18.4598 26.7141 17.6124 25.6688 17.6124C24.6235 17.6124 23.776 18.4598 23.776 19.5051L23.776 46.7922C23.776 47.8375 24.6235 48.6849 25.6688 48.6849C26.7141 48.6849 27.5615 47.8375 27.5615 46.7922L27.5615 19.5051ZM36.021 17.6342C37.0649 17.6894 37.8664 18.5803 37.8113 19.6242L36.3722 46.8732C36.3171 47.9171 35.4261 48.7187 34.3823 48.6635C33.3384 48.6084 32.5368 47.7175 32.592 46.6736L34.0311 19.4245C34.0862 18.3806 34.9771 17.5791 36.021 17.6342ZM13.5263 19.6242C13.4712 18.5803 14.2727 17.6894 15.3166 17.6342C16.3605 17.5791 17.2514 18.3806 17.3065 19.4245L18.7456 46.6736C18.8007 47.7175 17.9992 48.6084 16.9553 48.6635C15.9114 48.7187 15.0205 47.9171 14.9654 46.8732L13.5263 19.6242Z"/>
</svg>
            <button onClick={home} className={styles.back}>Back</button>
            <h1 className={styles.accountName}>{account ? account.account_name: <></>}</h1>
            <h1 className={styles.date}>{account ? <>{account.date} - {account.time}</> : <></>}</h1>
            <img src={logo} className={styles.logo} />
            <div className={styles.line} />
            <div className={styles.info}>
                {account ? <>
                <p className={styles.spend} style={{top: "209px" , left: "151px"}}><b>Spent:</b><br />{account.spend} ,-</p>
                <p className={styles.clicks} style={{top:"209px",left:"533px"}}><b>Clicks:</b><br />{account.link_click}</p>
                <p className={styles.cardInfo} style={{top:"209px",left:"818px"}}><b>Card info added:</b><br />{account.add_payment_info}</p>
                <p className={styles.leads} style={{top:"211px",left:"1276px"}}><b>Leads:</b><br />{account.leads}</p>
                <p className={styles.reach} style={{top:"377px",left:"151px"}}><b>Reach:</b><br />{account.reach}</p>
                <p className={styles.ctr} style={{top:"377px",left:"533px"}}><b>CTR:</b><br />{account.ctr !== "-" ? account.ctr.toFixed(2): account.ctr}</p>
                <p className={styles.cpc} style={{top:"545px",left:"533px"}}><b>CPC:</b><br />{account.cpc !== "-" ? account.cpc.toFixed(2): account.cpc}</p>
                <p className={styles.payment} style={{top:"377px",left:"818px"}}><b>Payment started:</b><br />{account.initiate_checkout}</p>
                <p className={styles.pricePerLead} style={{top:"379px", left:"1276px"}}><b>Price per lead:</b><br />{account.spendPerLead !== "-" ? account.spendPerLead.toFixed(2) : account.spendPerLead}</p>
                <p className={styles.impressions} style={{top:"545px",left:"151px"}}><b>Impressions</b><br />{account.impressions}</p>
                <p className={styles.purchases} style={{top:"545px",left:"818px"}}><b>Purchases</b><br />{account.purchases}</p>
                <p className={styles.roas} style={{top:"547px",left:"1276px"}}><b>ROAS</b><br />{account.roas !== "-" ? account.roas.toFixed(2) : account.roas}</p>
                </> : <></>}
            </div>
            <div className={styles.graphHolder}>
                <div className={styles.graph}><AccountPageGraph id={id}/></div>
                <div className={styles.viewBox}>
                    {account ? <>
                        <p className={styles.views}><b>Video views:</b><br />{account.video_views}</p>
                    <p className={styles.avgViews}><b>Video avg. watch time:</b><br />{account.videoAvgWatch} s</p>
                    </> : <></>
                }
                </div>
            </div>
            <div className={styles.adBox}>
                <div className={styles.headerBox}>
                <p>Ad name</p>
                <p>Campaign</p>
                <p>Spend</p>
                <p>Sales</p>
                <p>Add to cart</p>
                <p>Landing page view</p>
                <p>Leads</p>
                <p>Add payment info</p>
                <p>Initiate checkout</p>
                <p>Avg. watch time</p>
                <p>CPC</p>
                <p>CTR</p>
                <p>Impressions</p>
                <p>Reach</p>
                <p>ROAS</p>
                </div>
                <div className={styles.ads}>
                    <GetAds id={id} />
                </div>
            </div>
        </div>
    )
}

export default AccountPage;