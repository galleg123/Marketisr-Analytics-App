import TimeGraph from "./TimeGraph/TimeGraph";
import Timer from "../Timer/Timer";
import { useEffect, useState } from "react";
import styles from "./TimeGraphHolder.module.css";
import { useAccountIds } from "../AccountIdProvider";

function TimeGraphHolder() {
    const { accountIds } = useAccountIds();
    const [page, setPage] = useState(0);
    const [reset, setReset] = useState(true);
    const [timeAccounts, setTimeAccounts] = useState([]);
    const duration = 30;
    const idCount = 3;

    const nextPage = () => {
        setPage((prevPage) => {
            if (idCount * (prevPage + 1) < timeAccounts.length) {
                return prevPage + 1;
            } else {
                return 0;
            }
        });
        setReset((prev) => !prev);
    };

    useEffect(() => {
        const setTime = () => {
            setTimeAccounts(
                accountIds
                    .map((id) => {
                        const account = JSON.parse(
                            localStorage.getItem(`${id}`)
                        );
                        if (
                            !account ||
                            !account.account_name ||
                            typeof account.video_views !== "number" ||
                            typeof account.p25 !== "number" ||
                            typeof account.p50 !== "number" ||
                            typeof account.p75 !== "number" ||
                            typeof account.p100 !== "number" ||
                            account.video_views <= 0
                        ) {
                            return null;
                        } else return id;
                    })
                    .filter((id) => id)
            );
        };

        const interval = setInterval(() => {
            setTime();
        }, 10000);

        return () => clearInterval(interval);
    }, [accountIds]);

    return (
        <div className={styles.timegraphholder}>
            <div className={styles.graph}>
                <TimeGraph
                    ids={timeAccounts.slice(
                        idCount * page,
                        Math.min(page * idCount + idCount, timeAccounts.length)
                    )}
                />
            </div>
            <div className={styles.timer}>
                <Timer
                    onComplete={nextPage}
                    reset={reset}
                    duration={duration}
                />
            </div>
                <button onClick={nextPage} className={styles.button}>Next</button>
        </div>
    );
}

export default TimeGraphHolder;
