import React from "react";

const Input = (props) => {
    const { onChange, value, fieldInput, text, isThereError } = props;

    const txtExceedBalance = "Exceeds balance";

    return (
        <div data-testid={"input"}>
            <span className="txt-plus-minus">{text}</span>
            <input
                onChange={onChange}
                value={value}
                className={fieldInput}
            />
            {isThereError && <div className="txt-error">{txtExceedBalance}</div>}
        </div>
    );
};

export { Input };