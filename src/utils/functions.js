const toFixedDigit=(i, digits) =>{
    var pow = Math.pow(10, digits);

    return Math.floor(i * pow) / pow;
}
export { toFixedDigit };