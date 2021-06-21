import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
};

function TodoForm(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        setValue(e.target.value);   
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(!onSubmit) return;

        if (value !== '') {
            const formValues = {
                title: value,
            };
            onSubmit(formValues);
            setValue('');
        } else {
            alert('vui long nhap');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleValueChange}/>
            <button>ok</button>
        </form>
    );
}

export default TodoForm;