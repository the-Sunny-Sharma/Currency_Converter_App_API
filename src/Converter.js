import { useRef, useState } from 'react';
import axios from 'axios';
import './Converter.css';

function Converter(){

    const [ amt_in_dollars, setAmt_in_dollars ] = useState('');
    const [ convertedAmount , setConvertedAmount ] = useState('');
    
    const rAmt_in_dollars = useRef();

    const hAmt_in_dollars = (event) => { setAmt_in_dollars(event.target.value); }

    const convert = (event) => {
        event.preventDefault();
        if(!amt_in_dollars){
            alert('Please anter an amount');
            setConvertedAmount('');
            rAmt_in_dollars.current.focus();
            return;
        }
        if(amt_in_dollars < 0){
            alert('Please anter an valid amount');
            setConvertedAmount('');
            rAmt_in_dollars.current.focus();
            return;
        }
        let url = "https://api.exchangerate-api.com/v4/latest/USD";
        axios.get(url)
        .then(res => {
            let amt_in_rupees = amt_in_dollars * (res.data.rates.INR);
            setConvertedAmount(`\u20B9 ${amt_in_rupees.toFixed(2)}`);
        })
        .catch(res => {
            alert(`Error: ${res}`);
        });
    }

    const clear = (event) => {
        event.preventDefault();
        setAmt_in_dollars("");
        setConvertedAmount("");
        return;
    }

    return (
        <>
            <h1 className='heading center-block'>Currency Converter App</h1>
            <p className='center-block text'>A project made by Sunny Sharma under the guidance of Kamal Sir.</p>
            <p className='center-block text'>This website shows you the live rates of the currency using API.</p>
            <form onSubmit={ convert } className='container'>
                <input className="textField" type='number' step='any' placeholder="Enter the Amount in Dollars" onChange={hAmt_in_dollars} value={amt_in_dollars} ref={rAmt_in_dollars} />
                <input className='sbmBtn btn' type='submit'/>
                <button className='clrBtn btn' onClick={clear}>Clear</button>
            </form>
            <p className='ans text'>Amount in Rupees: {convertedAmount}</p>
        </>
    );
}

export default Converter;
