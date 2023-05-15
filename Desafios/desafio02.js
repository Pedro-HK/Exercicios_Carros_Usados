function anagrama1(str1, str2){
    if(str1.length !== str2.length){
        return false
    }

    const string1 = str1.split('').sort().join('')
    const string2 = str2.split('').sort().join('')

    return string1 === string2
}

function anagrama2(str1, str2){
    if(str1.length !== str2.length){
        return false
    }

    let index1 = []
    let index2 = []

    for(i = 0; i < str1.length; i++){
        index1[str1[i]] = (index1[str1[i]] || 0) + 1
        index2[str2[i]] = (index2[str2[i]] || 0) + 1
    }

    for(i = 0; i < str1.length; i++){
        if(index1[str1[i]] !== index2[str2[i]]){
            return false
        }
    }
    return true
}

console.log(anagrama1('amora', 'aroma'))

console.log(anagrama2('amora', 'aroma'))
