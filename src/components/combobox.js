import React from 'react';

const ComboBox = (props) => {
    const { data, val, handleChange, fieldComboBox } = props;

    return (
        <div className={fieldComboBox}>
            <select value={val}
                onChange={handleChange}>
                {
                    data?.map((item, index) => {
                        return (
                            <option value={`${item?.value}`}
                                key={index}>{item?.text}</option>
                        )
                    })
                }
            </select>
        </div>
    )
};

export { ComboBox };