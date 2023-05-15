function minNumber(arr) {
    for(i = 1; i <= arr.length + 1; i++){
        if(!arr.includes(i)){
            return i
        }
    }
}

console.log(minNumber([1, 2, 3, 4, 5]))