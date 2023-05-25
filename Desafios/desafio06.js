function prefixo(strings) {
  const first = strings[0];
  let prefixo = "";

  for (let i = 0; i < first.length; i++) {
    const letter = first[i];

    if (strings.every((str) => str[i] === letter)) {
      prefixo += letter;
    } else {
      break;
    }
  }

  return prefixo;
}

console.log(prefixo(["segunda", "segurar", "segredo"]));
