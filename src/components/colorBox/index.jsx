import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './colorBox.scss'

// ColorBox.propTypes = {
    
// };

function getRandomColor() {
    const color__list = ['red', 'blue', 'yellow', 'black', 'white'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return color__list[randomIndex];
}

function ColorBox(props) {
     const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box__color') || 'deeppink';
        return initColor
     });

    function handleBoxClick () {
        const newColor = getRandomColor();
        setColor(newColor);

        localStorage.setItem('box__color', newColor);
    }

    return (
        <div 
            className = "color-box"
            style = {{ backgroundColor : color}}
            onClick = {handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;