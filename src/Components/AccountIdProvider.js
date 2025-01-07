import { useEffect } from "react";
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";


const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [accountIds, setAccountIds] = useState([]);

    useEffect(() => {
        const accountIdsCookie = Cookies.get('accountIds');
        if (accountIdsCookie) {
            setAccountIds(JSON.parse(Cookies.get('accountIds')));
        }
    }, [])

    return (
        <AccountContext.Provider value={{ accountIds, setAccountIds }}>
            {children}
        </AccountContext.Provider>
    )
};

export const useAccountIds = () => {
    return useContext(AccountContext);
}
