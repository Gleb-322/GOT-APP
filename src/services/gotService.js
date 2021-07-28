export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    async GetResource(url) {
        const result = await fetch(`${this._apiBase}${url}`)

        if(!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }
        return await result.json()
    }
    getAllCharacters() {
        return this.GetResource('/characters?page=5&pageSize=10')
    }
    getCharacter(id) {
        return this.GetResource(`/characters/${id}`)
    }
    getAllBooks() {
        return this.GetResource('/books/')
    }
    getBook(id) {
        return this.GetResource(`/books/${id}`)
    }
    getAllHouses() {
        return this.GetResource('/houses/')
    }
    getHouse(id) {
        return this.GetResource(`/houses/${id}`)
    }
}


const got = new GotService()

got.getAllCharacters()
    .then(res => {
        res.forEach((item) => console.log(item.name))
    })

got.getCharacter(130)
    .then(result => console.log(result))


got.getAllBooks()
    .then(res => {
        res.forEach((item) => console.log(item.name))
    })

got.getBook(3)
    .then(result => console.log(result))


got.getAllHouses()
    .then(res => {
        res.forEach((item) => console.log(item.name))
    })

got.getHouse(13)
    .then(result => console.log(result))