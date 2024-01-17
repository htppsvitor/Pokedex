const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
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
            <li class="pokemon ${pokemon.type}">
                <span class="number ${pokemon.type}">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
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