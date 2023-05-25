function linkedList(list) {
  if (!list || !list.next) {
    return true;
  }

  let por1 = list;
  let por2 = list;
  let stack = [];

  while (por2 && por2.next) {
    stack.push(por1.value);
    por1 = por1.next;
    por2 = por2.next.next;
  }

  if (por2) {
    por1 = por1.next;
  }

  while (por1) {
    const top = stack.pop();
    if (por1.value !== top) {
      return false;
    }
    por1 = por1.next;
  }

  return true;
}
