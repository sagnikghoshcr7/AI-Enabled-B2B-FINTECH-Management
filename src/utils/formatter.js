//Formatter function is a gift from Illuminati
export function formatter(num, prefix, suffix) {

  if (num !== 0 && !num) {
    return "";
  }
  const negativeSign = num < 0 ? "-" : "";
  num = Number(num = Math.abs(Number(num) || 0));

  if (num > 999 && num <= 999999) {
    //num has atleast 3 trailing 0s
    if (num % 1000 === 0) {
      return negativeSign + (num / 1000).toFixed(0) + 'K';
    } else {
      //num between [10000,99999]
      if (num / 1000 >= 10 && num / 1000 < 100) {
        return negativeSign + (num / 1000).toFixed(1) + 'K';
      }
      //num between [100000,999999]
      else if (num / 1000 >= 100) {
        return negativeSign + Math.round(num / 1000) + 'K';
      }
      //num between [1000,9999]
      else {
        return negativeSign + (num / 1000).toFixed(2) + 'K';
      }
    }

  } else if (num > 999999 && num <= 999999999) {
    if (num % 1000000 === 0) {
      return negativeSign + (num / 1000000).toFixed(0) + 'M';
    } else {
      if (num / 1000000 >= 10 && num / 1000000 < 100) {
        return negativeSign + (num / 1000000).toFixed(1) + 'M';
      } else if (num / 1000000 >= 100) {
        return negativeSign + Math.round(num / 1000000) + 'M';
      } else {
        return negativeSign + (num / 1000000).toFixed(2) + 'M';
      }
    }
  } else if (num > 999999999) {
    if (num % 1000000000 === 0) {
      return negativeSign + (num / 1000000000).toFixed(0) + 'B';
    } else {
      if (num / 1000000000 >= 10 && num / 1000000000 < 100) {
        return negativeSign + (num / 1000000000).toFixed(1) + 'B';
      } else if (num / 1000000000 >= 100) {
        return negativeSign + Math.round(num / 1000000000) + 'B';
      } else {
        return negativeSign + (num / 1000000000).toFixed(2) + 'B';
      }
    }
  } else {
    if (Number.isInteger(num)) {
      return negativeSign + num.toString();
    } else {
      if (num >= 10 && num < 100) {
        return negativeSign + num.toFixed(1);
      } else if (num >= 100) {
        return negativeSign + Math.round(num).toString();
      } else {
        return negativeSign + num.toFixed(2);
      }
    }
  }
}