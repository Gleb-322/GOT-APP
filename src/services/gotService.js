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
    async getAllCharacters() {
        const res = await this.GetResource('/characters?page=5&pageSize=10')
        return res.map(this._transformCharacter)
    }
    async getCharacter(id) {
        const char = await this.GetResource(`/characters/${id}`)

        const keys = Object.keys(char)
        keys.forEach(key => {
            if (char[key] === '') {
                char[key] = 'No Data'
            }
        })

        return this._transformCharacter(char)
    }
    async getAllBooks() {
        const res = await this.GetResource('/books/')
        return res.map(this._transformBook)
    }
    async getBook(id) {
        const book = await this.GetResource(`/books/${id}`)
        return this._transformBook(book)
    }
    async getAllHouses() {
        const res = await this.GetResource('/houses/')
        return res.map(this._transformHouse)
    }
    async getHouse(id) {
        const house = await this.GetResource(`/houses/${id}`)
        return this._transformHouse(house)
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }


    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}
