import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {
    
};

function Clock(props) {
    const [timeString, setTimeString] = useState('');

    const formatDate = (date) => {
        if(!date) {
            return ''; 
        }

        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);

        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const clockInterval= setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        return () => {
            clearInterval(clockInterval);
        }
    }, []);

    return (
        <p style={{color: 'red', fontsize: '42px'}}>{timeString}</p>
    );
}

export default Clock;