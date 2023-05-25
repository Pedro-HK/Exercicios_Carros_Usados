function retornaPassos(number) {
  let quantidadePassos = 0;

  for (i = 0; number > 0; i++) {
    if (number % 2 === 0) {
      number = number / 2;
      quantidadePassos++;
    } else {
      number = number - 1;
      quantidadePassos++;
    }
  }

  return "A quantidade de passos foi: " + quantidadePassos;
}

console.log(retornaPassos(48));
