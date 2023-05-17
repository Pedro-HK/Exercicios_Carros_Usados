(function (){
    // DOM
    const $containerProdutos = document.getElementById('container_produtos')
    const $marcaModelo = document.getElementById('marca_modelo')
    const $selectMarca = document.getElementById('select_marca')
    const $btnFiltro = document.querySelector('.btn_filtro')
    const $anoMinimo = document.getElementById('select_ano_minimo')
    const $anoMaximo = document.getElementById('select_ano_maximo')
    const $tipoCombustivel = document.getElementById('select_combustivel')
    const $carrosNaoUsados = document.getElementById('chk_carros')
    const $precoMinimo = document.getElementById('preco_minimo')
    const $precoMaximo = document.getElementById('preco_maximo')
    const $kmMinimo = document.getElementById('km_minimo')
    const $kmMaximo = document.getElementById('km_maximo')
    const $crescente = document.getElementById('cresc')
    const $decrescente = document.getElementById('decresc')
    const $categoria = document.getElementById('select_categoria')
    const $mediana = document.querySelector('.mediana_anos_carros_selecionados output')
    const $mediaPrecos = document.querySelector('.media_precos output')
    const $btnMediaPrecos = document.querySelector('.btn_media_precos')
    const $anoPopular = document.querySelector('.ano_popular output')
    const $btnAnoPopular = document.querySelector('.btn_ano_popular')
    const $carrosSelecionados = document.querySelector('.carros_selecionados output')
    const $valorTotalCarros = document.querySelector('.valor_carros_selecionados output')
    const $desvioPadrao = document.querySelector('.desvio_padrao_km_carros_selecionados output')
    const $promocao = document.querySelector('.promocao')
    const $buttonPromocao = document.querySelector('.banner_promocao button')
    const $buttonMenu = document.querySelector('.show_menu .menu_icone')
    const $responsiveMenu = document.querySelector('header .responsive_menu')
    
    // obter os dados do "data.json" através do fetch
    const data = fetch('data.json').then(response => {
        return response.json()
    });

    // funções que retornam valor para determinado elemento selecionado 
    function getMarca(){
        if($selectMarca[1].selected) return 'Chery'
        if($selectMarca[2].selected) return 'Chevrolet'
        if($selectMarca[3].selected) return 'Ford'
        if($selectMarca[4].selected) return 'Honda'
        if($selectMarca[5].selected) return 'Renault'
        if($selectMarca[6].selected) return 'Toyota'
        if($selectMarca[7].selected) return 'Volkswagen'
    }
    
    function getAnoMinimo(){
        i = 1
        while(i < $anoMinimo.length){
            if($anoMinimo[i].selected) return $anoMinimo[i].textContent
            i++
        }
    }

    function getAnoMaximo(){
        i = 1
        while(i < $anoMaximo.length){
            if($anoMaximo[i].selected) return $anoMaximo[i].textContent
            i++
        }
    }

    function getCombustivel(){
        i = 1
        while(i < $tipoCombustivel.length){
            if($tipoCombustivel[i].selected) return $tipoCombustivel[i].textContent
            i++
        }
    }

    function getCategoria(){
        i = 1
        while(i < $categoria.length){
            if($categoria[i].selected) return $categoria[i].textContent
            i++
        }
    }

    
    // função para obter os dados do "data.json" e inserir nos inputs do HTML
    function input(){
        data.then(dados =>{
            putAno(dados)
            putCombustivel(dados)
            putMarca(dados)
        })
    }

    // função para organizar uma array com os anos de cada dado e inserir nas opções no HTML
    function putAno(dados){
        // retira as informações repetidas
        let filtraAno = dados.reduce((items, currentItem) =>{
            if(items.indexOf(currentItem.ano) < 0){
                items.push(currentItem.ano)
            }
            return items
        }, [])
        
        // organiza em ordem crescente
        filtraAno.sort((a, b) => a - b)

        // inseri no HTML
        filtraAno.map(el => {
            $anoMinimo.innerHTML += `<option>${el}</option>`
            $anoMaximo.innerHTML += `<option>${el}</option>`
        })
    }

    // função para organizar uma array com o combustível de cada dado e inserir nas opções no HTML
    function putCombustivel(dados){
        // retira as informações repetidas
        let filtraCombustivel = dados.reduce(function(items, currentItem){
            if(items.indexOf(currentItem.combustivel) < 0){
                items.push(currentItem.combustivel)
            }
            return items
        }, [])

        // organiza em ordem crescente
        filtraCombustivel.sort((a, b) => {
            if(a < b){
                return -1
            } else{
                return true
            }
        })

        filtraCombustivel.sort((a, b) => {
            return a.localeCompare(b)
        })

        // inseri no HTML
        filtraCombustivel.map(el => {
            $tipoCombustivel.innerHTML += `<option>${el}</option>`
        })
    }

    // função para organizar uma array com as marcas de cada dado e inserir nas opções no HTML
    function putMarca(dados){
        // retira as informações repetidas
        let filtraMarca = dados.reduce(function(items, currentItem){
            if(items.indexOf(currentItem.marca) < 0){
                items.push(currentItem.marca)
            }
            return items
        }, [])

        // obtem todas as informações(mesmo repetidas)
        let marcas = dados.reduce((items, currentItem) =>{
            items.push(currentItem.marca)
            return items
        }, [])

        // organiza em ordem crescente
        filtraMarca.sort((a, b) => {
            if(a < b){
                return -1
            } else{
                return true
            }
        })

        // obtem a quantidade de vezes que um index de cada marca aparece
        function indexMarca (marcas){
            let index = []
            marcas.forEach(marca => {
                index[marca] = (index[marca] || 0) + 1
            })

            return index
        }
        
        let quantidadeMarcas = indexMarca(marcas)

        //inseri no HTML
        filtraMarca.map(el =>{
            $selectMarca.innerHTML += `<option>${el}<output>(${quantidadeMarcas[el]})</output></option>` 
        })
    }
    
    // função para calcular a média
    function calcularMedia(dados){
        let total = 0
        let quantidade = dados.length
        dados.forEach((dado) => {
            total += dado
        })
        return total / quantidade
    }

    //função para exibir banner de promoção
    function bannerPromo(){
        let precos = []
        data.then(dados =>{
            dados.map((dado) =>{
                precos.push(dado.preco)
                //obtem o carro com menor preço
                if(dado.preco === Math.min(...precos)){
                    $promocao.innerHTML = `
                    <h1>Promoção imperdível!!</h1>
                    <h1>25% OFF</h1>
                    <div>
                        <h2>${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format((dado.preco / 4) * 3)}</h2>
                        <h4>${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(dado.preco)}</h4>
                        <h3>Marca: ${dado.marca}</h3>
                        <h3>Modelo: ${dado.modelo}</h3>
                        <img src="${dado.imagem}">
                    </div>
                    <h2></h2>
                    `

                    //inseri a contagem regressiva de 3 horas
                    const $date = document.querySelector('.promocao h2:last-child')

                    const endDate = new Date()
                    endDate.setHours(endDate.getHours() + 3)

                    let counting = setInterval(() =>{
                        const now = new Date().getTime()
                        const remaining = endDate - now

                        const oneDay = 24 * 60 * 60 * 1000
                        const oneHour = 60 * 60 * 1000
                        const oneMinute = 60 * 1000
                        const oneSecond = 1000

                        const hour = Math.floor((remaining % oneDay / oneHour))
                        const minute = Math.floor((remaining % oneHour / oneMinute))
                        const second = Math.floor((remaining % oneMinute / oneSecond))

                        $date.innerHTML = `Restam apenas: ${hour} : ${minute} : ${second} horas!!`
                    }, 1000)

                    //evento para mostrar ou esconder o banner
                    $buttonPromocao.addEventListener('click', () =>{
                        if($promocao.classList.contains('showPromocao')){
                            $promocao.classList.remove('showPromocao')
                            document.querySelector('.icone_promocao').src = "/Imagens/circle-up.svg"
                        }else{
                            $promocao.classList.add('showPromocao')
                            document.querySelector('.icone_promocao').src = "/Imagens/circle-down.svg"
                        }
                    })
                }
            })
        })

    }
    
    bannerPromo()

    // função para filtrar os dados do "data.json"
    function filter(){
        data.then(dados =>{
            //arrays com as informações filtradas
            let anosAtualizados = []
            let kmAtualizado = []
            let precosAtualizados = []

            //funções para ordenar em ordem crescente ou descrescente de acordo com a categoria selecionada
            function ordenaMarca(){
                if($crescente.checked){
                    carrosFiltrados.sort((a, b) => {
                        if(a.marca < b.marca){
                            return -1
                        } else{
                            return true
                        }
                    })      
                }

                if($decrescente.checked){
                    carrosFiltrados.sort((a, b) => {
                        if(a.marca > b.marca){
                            return -1
                        } else{
                            return true
                        }
                    })
                }
            }

            function ordenaPreco(){
                if($crescente.checked){
                    carrosFiltrados.sort((a, b) => a.preco - b.preco)     
                }
                
                if($decrescente.checked){
                    carrosFiltrados.sort((a, b) => b.preco - a.preco)
                }
            }

            function ordenaKm(){
                if($crescente.checked){
                    carrosFiltrados.sort((a, b) => a.km - b.km)      
                }
                
                if($decrescente.checked){
                    carrosFiltrados.sort((a, b) => b.km - a.km)
                }
            }

            function ordenaModelo(){
                if($crescente.checked){
                    carrosFiltrados.sort((a, b) => {
                        if(a.modelo < b.modelo){
                            return -1
                        } else{
                            return true
                        }
                    })      
                }
                
                if($decrescente.checked){
                    carrosFiltrados.sort((a, b) => {
                        if(a.modelo > b.modelo){
                            return -1
                        } else{
                            return true
                        }
                    })
                }
            }

            function ordenaAno(){
                if($crescente.checked){
                    carrosFiltrados.sort((a, b) => a.ano - b.ano)      
                }
                
                if($decrescente.checked){
                    carrosFiltrados.sort((a, b) => b.ano - a.ano)
                }
            }

            // método para percorrer todos os dados e de acordo com os "if" filtra e coloca os dados restantes na array "carros", assim como a propriedade de cada dado
            const carrosFiltrados = dados.filter(car => {

                const filtroCarrosNaoUsados = $carrosNaoUsados.checked && !car.usado;
                const filtroCarrosUsados = !$carrosNaoUsados.checked && (car.usado === true || car.usado === false);
                const filtroMarca = getMarca() === car.marca || !getMarca();
                const filtroAno = (getAnoMinimo() <= car.ano || !getAnoMinimo()) && (getAnoMaximo() >= car.ano || !getAnoMaximo());
                const filtroCombustivel = getCombustivel() === car.combustivel || !getCombustivel();
                const filtroPreco = ($precoMinimo.value <= car.preco || $precoMinimo.value === '') && ($precoMaximo.value >= car.preco || $precoMaximo.value === '');
                const filtroKm = ($kmMinimo.value <= car.km || $kmMinimo.value === '') && ($kmMaximo.value >= car.km || $kmMaximo.value === '');
            
                return (filtroCarrosNaoUsados || filtroCarrosUsados) && filtroMarca && filtroAno && filtroCombustivel && filtroPreco && filtroKm;
            });
            
            carrosFiltrados.forEach(car => {
                anosAtualizados.push(car.ano);
                kmAtualizado.push(car.km);
                precosAtualizados.push(car.preco);
            
                switch(getCategoria()){
                    case('marca'):
                        ordenaMarca()
                        break
                    case('modelo'):
                        ordenaModelo()
                        break
                    case('quilometragem'):
                        ordenaKm()
                        break
                    case('preço'):
                        ordenaPreco()
                        break
                    case('ano'):
                        ordenaAno()
                        break
                }
            });
            
            // imprimir os carros filtrados na tela
            mostraListaDeCarros(carrosFiltrados)

            // evento para o click do botão de média de preços após filtrados 
            $btnMediaPrecos.addEventListener('click', () => {
                $mediaPrecos.innerText = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(calcularMedia(precosAtualizados))
            })

            // função para obter o ano mais repetido após filtrados
            function anoPopular (anosAtualizados){
                let popular = {}
                anosAtualizados.forEach(ano => {
                    popular[ano] = (popular[ano] || 0) + 1
                })
                const valorMaximo = Math.max(...Object.values(popular))

                const num = Object.keys(popular).find((key) => popular[key] === valorMaximo)
                
                return num
            }

            $btnAnoPopular.addEventListener('click', () => {
                $anoPopular.innerText = anoPopular(anosAtualizados)
            })
        })
    }

    
    // função para mostrar todos os dados presentes no "data.json" na tela
    function mostraListaDeCarros(dados){
        $containerProdutos.innerHTML = ''

        let selected = 0
        let totalValor = 0

        let anosSelecionados = []

        let kmSelecionados = []

        function calcularMedianaAno(arrayAnos){
            // obtem o numero do meio caso a array for impar
            let medianaImpar = arrayAnos[((arrayAnos.length / 2) - .5)]
            
            // obtem os dois numeros do meio caso a array for par
            let medianaPar1 = arrayAnos[((arrayAnos.length / 2) - 1)]
            let medianaPar2 = arrayAnos[(arrayAnos.length / 2)]

            if(arrayAnos.length % 2 === 0){
                return (medianaPar1 + medianaPar2) / 2
            } else{
                return medianaImpar
            }
        }

        function calcularDesvioPadrao(kmSelecionados){
            let mediaKm = calcularMedia(kmSelecionados)

            let desvio = kmSelecionados.reduce((items, currentItem) =>{
                let diminuirDesvio = currentItem - mediaKm
                items.push(diminuirDesvio)
                return items
            }, [])

            let totalVariancia = 0

            desvio.forEach((el) =>{
                totalVariancia += (el ** 2)
            })

            let variancia = totalVariancia / desvio.length

            let desvioPadrao = Math.sqrt(variancia)

            return desvioPadrao
        }

        //percorre todos os dados do "data.json" e imprimi cada um no HTML
        dados.forEach((dado) => {
            const card_carro = document.createElement('div')

            card_carro.classList.add('card_carro')

            card_carro.innerHTML = `
                <h2>${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(dado.preco)}</h2>
                <strong>Modelo: ${dado.modelo}</strong>
                <strong>Marca: ${dado.marca}</strong>
                <img src="${dado.imagem}" class="img_carro">
                <img src="/Imagens/ano de fabricação.png">
                <p>${dado.ano}</p>
                <img src="/Imagens/quilometragem.png">
                <p>${Intl.NumberFormat('pt-BR').format(dado.km)} Km</p>
                <img src="/Imagens/combustivel.png">
                <p>${dado.combustivel}</p>
            `

            // evento que gera um estilo diferente para carros selecionados 
            card_carro.addEventListener('click', (e) =>{
                if(card_carro.style.background == ''){
                    card_carro.style.transition = 'all .5s'
                    card_carro.style.background = 'rgb(68, 152, 68)'
                    card_carro.style.transform = 'rotate(360deg)'
                    selected++
                    totalValor += dado.preco
                    anosSelecionados.push(dado.ano)
                    anosSelecionados.sort((a, b) => a - b)
                    kmSelecionados.push(dado.km)
                } else {
                    card_carro.style.transition = 'all .5s'
                    card_carro.style.background = ''
                    card_carro.style.transform = 'rotate(-360deg)'
                    selected--
                    totalValor -= dado.preco
                    anosSelecionados.splice(anosSelecionados.indexOf(dado.ano), 1)
                    kmSelecionados.splice(kmSelecionados.indexOf(dado.km), 1)
                }

                // imprimi na tela o valor total do preço de todos os carros selecionados 
                $valorTotalCarros.innerHTML = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(totalValor) 

                // imprimi na tela a quantidade de carros selecionados 
                $carrosSelecionados.innerHTML = selected

                // imprimi a mediana dos anos dos carros selecionados na tela
                if(anosSelecionados.length === 0){
                    $mediana.innerHTML = 0
                } else{
                    $mediana.innerHTML = calcularMedianaAno(anosSelecionados)
                }

                if(kmSelecionados.length == 0){
                    $desvioPadrao.innerHTML = 0 + ' Km'
                } else{
                    $desvioPadrao.innerHTML = calcularDesvioPadrao(kmSelecionados) + ' Km'
                }

            })
            
            $containerProdutos.appendChild(card_carro)
            
            $mediana.innerHTML = calcularMedianaAno(anosSelecionados)
            $desvioPadrao.innerHTML = calcularDesvioPadrao(kmSelecionados) + ' Km'
        })

        // imprimi na tela o valor 0 caso nada seja selecionado
        $valorTotalCarros.innerHTML = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(0)
        $carrosSelecionados.innerHTML = selected
        $mediaPrecos.innerText = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(0)
        $anoPopular.innerText = 0
        $mediana.innerHTML = 0
        $desvioPadrao.innerHTML = 0 + ' Km'
    }

    // imprimir as propriedades dos dados nas "option" dos "select" no HTML
    input()

    // imprimir todos os dados do "data.json" na tela
    filter()

    // abrir e fechar menu
    $buttonMenu.addEventListener('click', () => {
        if($responsiveMenu.classList.contains('open_menu')){
            $responsiveMenu.classList.remove('open_menu')
            document.querySelector('.icone_menu').src = '/Imagens/menu.svg'
        } else{
            $responsiveMenu.classList.add('open_menu')
            document.querySelector('.icone_menu').src = '/Imagens/cross.svg'
        }
    })

    // acionar novamente caso o botão do filtrar seja acionado 
    $btnFiltro.addEventListener('click', (e) => {
        e.preventDefault(e)
        $containerProdutos.innerHTML = ''
        filter()
    })

    // input de texto que imprimi os carros na tela conforme for digitando
    $marcaModelo.addEventListener('input', (e) => {
        const searchCar = $marcaModelo.value.toLowerCase()

        data.then(dados => {
            // filtro que pesquisa cada vez que uma tecla for digitada, verificando se determinado caracter existe entre as marcas e modelos dos dados
            const filteredCars = dados.filter((car) => {
                return car.modelo.toLowerCase().includes(searchCar) || car.marca.toLowerCase().includes(searchCar)
            })
            mostraListaDeCarros(filteredCars)
        })
    })
})()
