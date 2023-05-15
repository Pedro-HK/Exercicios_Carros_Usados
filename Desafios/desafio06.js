function prefixo(){
    const strings = ["Sabado", "Segunda", "Domingo", "Dia", "Sexta"];

    let prefixCounts = strings.reduce((previous, current) =>{
        let prefix = current[0];

        if (previous[prefix]) {
            previous[prefix]++;
        } else {
            previous[prefix] = 1;
        }

        return previous;
    }, {});

    let mostCommonPrefix = "";
    let mostCommonCount = 0;

    for (let prefix in prefixCounts) {
        if (prefixCounts[prefix] > mostCommonCount) {
            mostCommonPrefix = prefix;
            mostCommonCount = prefixCounts[prefix];
        }
    }

    if (mostCommonCount === 0) {
        console.log("");
    } else {
        console.log(mostCommonPrefix);
    }

    return mostCommonPrefix;
}

prefixo()