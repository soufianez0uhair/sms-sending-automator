import Logo from '../assets/images/logo.png';

import { useState } from 'react';

import axios from 'axios';

const SmsSender = () => {
    const [numbers, setNumbers] = useState([]);

    function handleNumbers(e) {
        const newNumbers = e.target.value.split(',');
        setNumbers(newNumbers);
    }

    const [message, setMessage] = useState('');

    function handleMessage(e) {
        setMessage(e.target.value);
    }

    const [api, setApi] = useState('');

    function handleApi(e) {
        setApi(e.target.value);
    }

    function sendMessage(num, message, api) {
        axios.post(api, {
                phone: num,
                message
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(() => {
                console.log('done');
            })
            .catch(err => console.log(err.message));
    }

    function handleSubmit(e) {
        e.preventDefault();

        for(let i = 0; i < numbers.length; i++) {
            sendMessage(numbers[i], message, api);
        }
    }

    console.log(api);
    return (
        <div className="smsSender">
            <div className="smsSender__logo">
                <img src={Logo} alt="logo" className="smsSender__logo__img" />
                <h1 className="smsSender__logo__text">SMS SENDING AUTOMATOR</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="smsSender__form">
                <label htmlFor="api">Enter the API:</label>
                <input type="text" className="smsSender__input" name="api" value={api} onChange={(e) => handleApi(e)} />
                <label htmlFor="numbers">Enter the numbers that you want to send the message to(separate each number with a comma ',' no space!):</label>
                <textarea name="numbers" id="numbers" cols="30" rows="10" className="smsSender__textarea" value={numbers} onChange={(e) => handleNumbers(e)} ></textarea>
                <label htmlFor="message">Enter the message that you want to send:</label>
                <textarea name="message" id="numbers" cols="30" rows="10" className="smsSender__textarea" value={message} onChange={(e) => handleMessage(e)} ></textarea>
                <button className="btn btn--send">Send</button>
            </form>
        </div>
    )
}

export default SmsSender;