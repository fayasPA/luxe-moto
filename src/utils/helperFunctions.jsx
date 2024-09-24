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

export const capitalizeFirstLetters = (string) => {
    if (!string) return string; // Handle empty string
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

export const capitalizeWord = (string) => {
    if (!string) return string; // Handle empty string
    return string.toUpperCase()
}


export const formatTextWithFonts = (text) => {
  if (!text) {
    // If text is undefined, null, or an empty string, return an empty array to avoid errors
    return [];
  }

  const regex = /(\d+|\D+)/g; // Matches both numbers and letters
  const parts = text.match(regex); // Splits text into numbers and letters

  if (!parts) {
    // If no parts are matched, return the original text wrapped in a span
    return <span>{text}</span>;
  }

  // Return JSX parts with the correct fonts applied
  return parts.map((part, index) => {
    if (/\d/.test(part)) {
      // Apply font to numbers
      return (
        <span key={index} className="font-josefin" style={{fontWeight: "bold"}}>
          {part}
        </span>
      );
    } else {
      // Apply font to letters
      return (
        <span key={index} >
          {part}
        </span>
      );
    }
  });
};
