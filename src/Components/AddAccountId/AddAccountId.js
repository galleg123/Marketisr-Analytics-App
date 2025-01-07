import { useState } from 'react'
import Cookies from 'js-cookie'
import { useAccountIds } from '../AccountIdProvider';
import styles from './AddAccountId.module.css'

function AddAccountId() {
    const { accountIds, setAccountIds } = useAccountIds();
    const [inputValue, setInputValue] = useState('');
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const newAccountId = inputValue;
        if (newAccountId === "") return;
        setInputValue('');
        if (!accountIds.includes(newAccountId)) {
            const updatedAccountIds = [...accountIds, newAccountId];
            setAccountIds(updatedAccountIds);
            Cookies.set('accountIds', JSON.stringify(updatedAccountIds), { expires: 365 * 10 });
        }
    }
    

    return(
    <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter Act ID" className={styles.inputBox} />
            <button type="submit" className={styles.addButton}>Add</button>
            </form>)
}

export default AddAccountId