function minNumber(arr) {
  const numSet = new Set(arr);

  for (let i = 1; i <= arr.length; i++) {
    if (!numSet.has(i)) {
      return i;
    }
  }
}
