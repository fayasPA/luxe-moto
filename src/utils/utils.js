export const getNumberToCurrencyText = (num, fractionalDigit=null) => {
    const myObj = {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: fractionalDigit ?? 0
    }
    let currencyText = num;
    try {
        currencyText = num.toLocaleString("en-IN", myObj);
    } catch (error) {
        console.log(error)
        currencyText = num
    }

    return currencyText;
};