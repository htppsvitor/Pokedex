const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const openButton = document.getElementById('openButton');
const content = document.getElementById('content');


const limit = 10;
let offset = 0;
const maxLimit = 151;

function convertPokemonTypesToLi(pokemoTypes) {
    return pokemoTypes.map((typeSlot) => `<li class="type">${typeSlot.types}</li>`)
}

PokeApi.getPokemons().then((pokemons = []) => {
    
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('')

})

function loadMore(offset, limit) {

    PokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" id="${pokemon.number}">
                <span class="number ${pokemon.type}">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>

                <div class="pelicula">
            
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtml

    })
}


loadMore(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit

    if(qtdRecord >= maxLimit) {
        const newLimit = maxLimit - offset
        loadMore(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    } else {

        loadMore(offset, limit)
    }

})



openButton.addEventListener('click', () => {

    var propriedade = window.getComputedStyle(content).getPropertyValue("height");

    if (propriedade === '0px') {
        content.style.height = '76vh'
        openButton.style.backgroundColor = '#77c850'

        lightColorRed.style.animation = '.8s light linear infinite'
        lightColorYellow.style.animation = '.9s light linear infinite'
        lightColorGreen.style.animation = '1s light linear infinite'
    } else {
        content.style.height = '0vh'
        openButton.style.backgroundColor = '#f7cf2c'

        lightColorRed.style.animation = 'none'
        lightColorGreen.style.animation = 'none'
        lightColorYellow.style.animation = 'none'
    }
    
})

const lightColorRed = document.getElementById('red')
const lightColorYellow = document.getElementById('yellow')
const lightColorGreen = document.getElementById('green')