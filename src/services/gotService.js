export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async GetResource(url) {
        const result = await fetch(`${this._apiBase}${url}`)

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}` +
              `, received ${result.status}`);
          }
    }

    async getAllCharacters() {
        const res = await this.GetResource(`/characters?page=5&pageSize=10`)
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
        const char = await this.GetResource(`/characters/${id}`)
        return this._transformCharacter(char)
    }

    async getAllBooks() {
        const res = await this.GetResource(`/books/`)
        return res.map(this._transformBook)
    }

    async getBook(id) {
        const book = await this.GetResource(`/books/${id}/`)
        return this._transformBook(book)
    }

    async getAllHouses() {
        const res = await this.GetResource(`/houses/`)
        return res.map(this._transformHouse)
    }

    async getHouse(id) {
        const house = await this.GetResource(`/houses/${id}/`)
        return this._transformHouse(house)
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'No Data'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/((\d)*)$/
        return item.url.match(idRegExp)[1]
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}
