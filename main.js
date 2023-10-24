let bodyCountries = document.getElementById('countries')
let search = document.getElementById('search')
let continents = document.getElementById('continentSelect')
let mode = document.getElementById('mode')
let page = document.querySelector('body')
let entete = document.querySelector('.entete')
let bodyContainer = document.querySelector('.containerBody')

// Mode Dark
mode.addEventListener('click', function () {   
    page.classList.toggle('modeDark') 
    if (bodyContainer.classList.contains('modelight')) {
        bodyContainer.classList.add('modeDark')
        bodyContainer.classList.remove('modelight')
        textMode.innerHTML = `<h3><span><i class="fa-solid fa-moon"></i></span> Mode Light</h3>`
    }else{        
        bodyContainer.classList.remove('modeDark')
        bodyContainer.classList.add('modelight')
        mode.innerHTML = `<h3><span><i class="fa-solid fa-moon"></i></span> Dark Mode</h3>`
    }

})

// Affichage DOM
function affichageDom(data) {
    // Parcourir les données du data
    data.forEach(country => {        
        // Recupération url flag du pays
        const urlFlagCountry = country.flags.png
        // // Recupération nom du pays
        const nameCountry = country.name.common
        // // Recupération de la population du pays
        const population = country.population
        // // Recupération du continent du pays
        const continent = country.continents
        // // Recupération du continent du pays
        const capital = country.capital

        // création de la card
        let col = document.createElement('div')
        col.className = 'col-12 col-md-3 card m-2 modelight'
        col.style.width = '18rem'
        col.style.height = '350px'        
        col.style.padding = '0px'
        col.style.cursor = 'pointer'
        
        let imgCard = document.createElement('img')
        imgCard.className = 'card-img-top'
        imgCard.style.width = '100%'
        imgCard.style.height = '150px'
        imgCard.src = urlFlagCountry

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body '
        // cardBody.classList.add('')
        
        let cardBodyCountry = document.createElement('h4')
        cardBodyCountry.className = 'card-text'
        cardBodyCountry.innerText = nameCountry
        
        let cardBodyPopulation = document.createElement('p')
        cardBodyPopulation.className = 'card-text'
        cardBodyPopulation.innerText = `Population: ${population}`
        
        let cardBodyRegion = document.createElement('p')
        cardBodyRegion.className = 'card-text'
        cardBodyRegion.innerText = `Region: ${continent}`
        
        let cardBodyCapital = document.createElement('p')
        cardBodyCapital.className = 'card-text'
        cardBodyCapital.innerText = `Capital: ${capital}`

        bodyCountries.append(col)
        col.append(imgCard)
        col.append(cardBody)
        cardBody.append(cardBodyCountry)
        cardBody.append(cardBodyPopulation)
        cardBody.append(cardBodyRegion)
        cardBody.append(cardBodyCapital)
        
        // Récupération des cards
        let cards = document.querySelectorAll ('.card')

        // Ecoute input search
        search.addEventListener('input', function(e){
            const lettreSaisi = e.target.value
            filterPays(lettreSaisi, cards)
        })
        
        continents.addEventListener('input', function(){
            let continentSelect = document.getElementById('continentSelect').options[document.getElementById('continentSelect').selectedIndex].innerHTML
            console.log(continentSelect);
            filterContinent(continentSelect, cards)
        })

        mode.addEventListener('click', function () {   
            page.classList.toggle('modeDark') 
            bodyContainer.classList.toggle('modeDark')
            col.classList.toggle('modeDark')
            
            bodyContainer.classList.toggle('modelight')
            col.classList.toggle('modelight')
        })
    })    
}

// Fonction pour afficher les pays
async function fetchPaysAll () {
    try {
        // API pour obtenir les pays 
        const r = await fetch('https://restcountries.com/v3.1/all')
        // recupération des données
        const data = await r.json()
        console.log(data);
        affichageDom(data)  

    } catch (error) {
        console.log('Impossible de contacter le serveur')
    }
}
fetchPaysAll ()

//  fonction pour filtrer les pays lors d'un saisi dans la barre de recherche
function filterPays(lettreSaisi, cards) {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].textContent.toLowerCase().includes(lettreSaisi)) {
            cards[i].style.display = 'block'
        } else {
            cards[i].style.display = 'none'
        }
    }
}

//  fonction pour filtrer les pays par continent
function filterContinent(continentSelect, cards) { 
    search.value = ''
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].innerHTML.toLowerCase().includes(continentSelect)) {
            cards[i].style.display = 'block'
        } else {
            cards[i].style.display = 'none'
        }
    }
}
