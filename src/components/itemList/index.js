import ItemList from './itemList';
import withData from '../hoc';
import GotService from '../../services/gotService';

const {getAllCharacters, getAllBooks, getAllHouses} = new GotService();

const ItemListChars = withData(ItemList, getAllCharacters);
const ItemListBooks = withData(ItemList, getAllBooks);
const ItemListHouses = withData(ItemList, getAllHouses);

export {
    ItemListChars, 
    ItemListBooks, 
    ItemListHouses
};