function minNumber(arr) {
    for(i = 1; i <= arr.length + 1; i++){
        if(!arr.includes(i)){
            return i
        }
    }
}