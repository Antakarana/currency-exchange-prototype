import React, { useState, useEffect } from 'react';
import rocket from '../assets/images/rocket.png';
import verticalArrow from '../assets/images/vertical-arrow.png';
import { Button, ComboBox, Input, Title } from '../components';
import { serviceConnectionConvertCurrencyAndAmount } from '../services/apis/api-functions';
import '../styles/exchange.css';
import { toFixedDigit } from '../utils/functions';

const Exchange = () => {
    const [selectedTopCurrency, setSelectedTopCurrency] = useState("EUR");
    const [selectedBottomCurrency, setSelectedBottomCurrency] = useState("USD");
    const [balanceUSD, setBalanceUSD] = useState(200);
    const [balanceEUR, setBalanceEUR] = useState(150);
    const [balanceGBP, setBalanceGBP] = useState(10);
    const [convertedValue, setConvertedValue] = useState(0);
    const [convertedCurrency, setConvertedCurrency] = useState("€");
    const [enteredAmount, setEnteredAmount] = useState("0");
    const [convertedAmount, setConvertedAmount] = useState("0");
    const initialCurrencies = [{ value: 'EUR', text: 'EUR' }, { value: 'USD', text: 'USD' }, { value: 'GBP', text: 'GBP' }];
    const [isExceedBalance, setIsExceedBalance] = useState(false);

    const handleChange = (event, section) => {
        if (section === 'top') setSelectedTopCurrency(event?.target?.value);
        else setSelectedBottomCurrency(event?.target?.value);
    }

    useEffect(() => {
        const convertCurrency = async () => {
            if (enteredAmount !== 0 || convertedAmount !== 0) {
                const responseConvertCurrency = await serviceConnectionConvertCurrencyAndAmount(selectedTopCurrency, selectedBottomCurrency, false);
                let convertedValue = "";
                let convertedCurrency = "";
                if (selectedBottomCurrency === "USD") {
                    convertedValue = responseConvertCurrency?.rates?.USD;
                    convertedCurrency = "$"
                }
                else if (selectedBottomCurrency === "GBP") {
                    convertedValue = responseConvertCurrency?.rates?.GBP;
                    convertedCurrency = "£"
                }
                else if (selectedBottomCurrency === "EUR") {
                    convertedValue = responseConvertCurrency?.rates?.EUR;
                    convertedCurrency = "€"
                }
                setConvertedValue(convertedValue);
                setConvertedCurrency(convertedCurrency);
            }
        }
        convertCurrency(selectedTopCurrency, selectedBottomCurrency);
    }, [selectedTopCurrency, selectedBottomCurrency]);


    useEffect(() => {
        setAndGetAmount(true, enteredAmount);
    }, [selectedTopCurrency]);

    useEffect(() => {
        setAndGetAmount(false, convertedAmount);
    }, [selectedBottomCurrency]);

    const setAndGetAmount = async (isFirst, amount) => {
        if (amount != 0) {
            isFirst ? setEnteredAmount(amount) : setConvertedAmount(amount);
            const responseGetAmount = await serviceConnectionConvertCurrencyAndAmount(isFirst ? selectedTopCurrency : selectedBottomCurrency, isFirst ? selectedBottomCurrency : selectedTopCurrency, true, amount);
            if (responseGetAmount?.status === 401) {
                alert(responseGetAmount?.data?.error?.message);
            }
            else isFirst ? setConvertedAmount(responseGetAmount?.result) : setEnteredAmount(responseGetAmount?.result);
        }
    }

    const setExchange = () => {
        if (selectedTopCurrency === 'USD') {
            if (enteredAmount <= balanceUSD) {
                setBalanceUSD(balanceUSD - parseFloat(enteredAmount));
                setBalance();
                setIsExceedBalance(false);
            }
            else if (enteredAmount > balanceUSD) setIsExceedBalance(true);
        }
        if (selectedTopCurrency === 'GBP') {
            if (enteredAmount <= balanceGBP) {
                setBalanceGBP(balanceGBP - parseFloat(enteredAmount));
                setBalance();
                setIsExceedBalance(false);
            }
            else if (enteredAmount > balanceGBP) setIsExceedBalance(true);
        }
        if (selectedTopCurrency === 'EUR') {
            if (enteredAmount <= balanceEUR) {
                setBalanceEUR(balanceEUR - parseFloat(enteredAmount));
                setBalance();
                setIsExceedBalance(false);
            }
            else if (enteredAmount > balanceEUR) setIsExceedBalance(true);
        }
    }

    const setBalance = () => {
        if (selectedBottomCurrency === 'USD') setBalanceUSD(balanceUSD + parseFloat(convertedAmount));
        else if (selectedBottomCurrency === 'GBP') setBalanceGBP(balanceGBP + parseFloat(convertedAmount));
        else if (selectedBottomCurrency === 'EUR') setBalanceEUR(balanceEUR + parseFloat(convertedAmount));
    }

    return (
        <>
            <div className="container">
                <Title
                    fieldStyle={"container-label"}
                    titleStyle={"label"}
                    text={"Currency Exchange Prototype"}
                    imgSrc={rocket}
                    imgWidth={25}
                    imgHeight={25}
                    imgStyle={"img-rocket"}
                    imgAlt={rocket} />
                <div className="container-table">
                    <div className="container-table-section">
                        <span className="field-section">
                            <span>
                                <ComboBox
                                    data={initialCurrencies}
                                    val={selectedTopCurrency}
                                    handleChange={(event) => handleChange(event, 'top')}
                                    fieldComboBox={"field-combo-box"}
                                />
                                <span className="txt-balance">Balance: {selectedTopCurrency === 'USD' ? '$' + balanceUSD?.toString().substring(0, 6) : selectedTopCurrency === 'GBP' ? '£' + balanceGBP?.toString().substring(0, 6) : '€' + balanceEUR?.toString().substring(0, 6)}</span>
                            </span>
                            <Input
                                onChange={(event) => setAndGetAmount(true, event?.target?.value)}
                                fieldInput={"input input-top"}
                                text={"-"}
                                value={enteredAmount ? toFixedDigit(enteredAmount, 2) : 0}
                                isThereError={isExceedBalance}
                            />
                        </span>
                    </div>
                    <div className="row">
                        <span className="exchange-info">
                            <span className="txt-exchange">
                                {
                                    selectedTopCurrency === 'EUR' ? '€1 ' : selectedTopCurrency === 'USD' ? '$1 ' : '£1 '
                                }
                                =
                                {' ' + convertedCurrency + convertedValue?.toString().substring(0, 6)}
                            </span>
                        </span>
                        <span className="arrow">
                            <img src={verticalArrow} width={25} height={25} className="img-vertical-arrow" alt="vertical arrow" />
                        </span>
                    </div>
                    <div className="container-table-section container-table-bottom">
                        <span className="field-section">
                            <span>
                                <ComboBox
                                    data={initialCurrencies}
                                    val={selectedBottomCurrency}
                                    handleChange={(event) => handleChange(event, 'bottom')}
                                    fieldComboBox={"field-combo-box"}
                                />
                                <span className="txt-balance">Balance: {selectedBottomCurrency === 'USD' ? '$' + balanceUSD?.toString().substring(0, 6) : selectedBottomCurrency === 'GBP' ? '£' + balanceGBP?.toString().substring(0, 6) : '€' + balanceEUR?.toString().substring(0, 6)}</span>
                            </span>
                            <Input
                                onChange={(event) => setAndGetAmount(false, event?.target?.value)}
                                fieldInput={"input input-bottom"}
                                text={"+"}
                                value={convertedAmount ? toFixedDigit(convertedAmount, 2) : 0}
                            />
                        </span>
                    </div>
                </div>
                <Button
                    btnStyle={"btn"}
                    onClick={setExchange}
                    textStyle={"btn-text"}
                    text={"Exchange"} />
            </div>
        </>
    )
}

export { Exchange };