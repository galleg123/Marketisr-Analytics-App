import { useState , useEffect} from "react"
import KundeKort from "../KundeKort/KundeKort"
import styles from './KortHolder.module.css'
import Timer from "../Timer/Timer";
import { useAccountIds } from "../AccountIdProvider";

function KortHolder() {
    const { accountIds } = useAccountIds();
    const [page, setPage] = useState(0);
    const [reset, setReset] = useState(true);
    const duration = 60;
    const styling = [styles.kort1, styles.kort2, styles.kort3, styles.kort4, styles.kort5, styles.kort6, styles.kort7, styles.kort8]

    const nextPage = () => {
        setPage((prevPage) => {
            // Calculate whether the next page is valid using the latest state
            if (8 * (prevPage+1) < accountIds.length) {
                return prevPage + 1; // Move to the next page
            } else {
                return 0; // Reset to the first page
            }
        });

        setReset((prev) => !prev);

    }



    return (
        <div className={styles.kortholder}>
            <div className={styles.timer}>
            <Timer onComplete={nextPage} reset={reset} duration={duration} />
            </div>
            <button onClick={nextPage} className={styles.next}>Next</button>
            {accountIds.slice(8 * page, Math.min(page * 8 + 8, accountIds.length)).map((id, index) => {
                return <div className={styling[index]}><KundeKort key={id} id={id} /></div>
            }
                
                
            )}
            
        </div>
    )

}

export default KortHolder