
const PokeApi = {}


PokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail)) 
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
}


PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonDetailToPokemon)
}


function convertPokemonDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}