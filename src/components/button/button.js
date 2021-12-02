import React from 'react';

const Button = (props) => {
    const { btnStyle, onClick, textStyle, text } = props;

    return (
        <button
            data-testid={"button"}
            className={btnStyle}
            onClick={onClick}>
            <span className={textStyle}>{text}</span>
        </button>
    );
}

export { Button };