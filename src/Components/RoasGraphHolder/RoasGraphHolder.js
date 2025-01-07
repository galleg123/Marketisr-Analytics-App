import { useEffect, useState } from "react";
import Timer from "../Timer/Timer";
import styles from "./RoasGraphHolder.module.css";
import RoasGraph from "./RoasGraph/RoasGraph";
import { useAccountIds } from "../AccountIdProvider";

function RoasGraphHolder() {
    const { accountIds } = useAccountIds();
    const [page, setPage] = useState(0);
    const [reset, setReset] = useState(true);
    const [roasAccounts, setRoasAccounts] = useState([]);
    const duration = 30;
    const idCount = 4;

    const nextPage = () => {
        setPage((prevPage) => {
            if (idCount * (prevPage + 1) < roasAccounts.length) {
                return prevPage + 1;
            } else {
                return 0;
            }
        });
        setReset((prev) => !prev);
    };

    useEffect(() => {
    }, [roasAccounts]);

    useEffect(() => {
        const setRoas = () => {
            setRoasAccounts(
                accountIds
                    .map((id) => {
                        const account = JSON.parse(
                            localStorage.getItem(`${id}`)
                        );
                        if (
                            !account ||
                            !account.roas ||
                            typeof account.roas !== "number"
                        ) {
                            return null;
                        } else return id;
                    })
                    .filter((id) => id)
            );
        };

        const interval = setInterval(() => {
            setRoas();
        }, 10000);

        return () => clearInterval(interval);
    }, [accountIds]);

    return (
        <div className={styles.roasgraphholder}>
            <div className={styles.graph}>
                <RoasGraph
                    ids={roasAccounts.slice(
                        idCount * page,
                        Math.min(page * idCount + idCount, roasAccounts.length)
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

export default RoasGraphHolder;
