import React from 'react';

const Title = (props) => {
    const { fieldStyle, titleStyle, text, imgSrc, imgWidth, imgHeight, imgStyle, imgAlt } = props;

    return (
        <div className={fieldStyle} data-testid={"title"}>
            <p className={titleStyle}>{text}</p>
            <img src={imgSrc} width={imgWidth} height={imgHeight} className={imgStyle} alt={imgAlt} />
        </div>
    )
};

export { Title };