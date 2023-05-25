function gray(x) {
  if (x === 0) {
    return "";
  }

  let grayNumbers = [];

  for (i = 0; i < Math.pow(2, x); i++) {
    let turnGray = i ^ (i >> 1);
    let binary = turnGray.toString(2);
    while (binary.length < x) {
      binary = "0" + binary;
    }
    grayNumbers.push(binary);
  }
  return grayNumbers;
}

console.log(gray(4));
