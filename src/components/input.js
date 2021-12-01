import React from "react";

const Input = (props) => {
    const { placeHolder, type, onChange, value, fieldInput, onFocus, onBlur, text, isThereError } = props;

    const txtExceedBalance = "Exceeds balance";

    return (
        <div>
            <span className="txt-plus-minus">{text}</span>
            <input
                onChange={onChange}
                placeholder={placeHolder}
                type={type}
                value={value}
                className={fieldInput}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {isThereError && <div className="txt-error">{txtExceedBalance}</div>}
        </div>
    );
};

export { Input };