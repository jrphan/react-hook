import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
};


function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleChangeValue = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    }

    const handleSubmit = (e) => {
        // const value = e.target.value;
        e.preventDefault();

        if(!onSubmit) {
            return;
        }

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                input: searchTerm,
            };
    
            onSubmit(formValues);
        }, 300);

    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChangeValue}
            />
            
        </form>
    );
}

export default PostFiltersForm;