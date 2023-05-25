function recursivoFibonacci(parametro) {
  if (parametro <= 1) {
    return parametro;
  }

  return recursivoFibonacci(parametro - 1) + recursivoFibonacci(parametro - 2);
}

function iterativoFibonacci(parametro) {
  let x = 0,
    y = 1,
    z = 1;
  for (i = 0; i < parametro; i++) {
    x = y;
    y = z;
    z = x + y;
  }
  return x;
}
