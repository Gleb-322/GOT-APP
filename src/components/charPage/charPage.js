import React, {Component} from 'react'
import ItemList from '../itemList'
import CharDetails, {Field} from '../charDetails'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'


export default class CharacterPage extends Component {

    GotService = new GotService()

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const charDetails = (
            <CharDetails charId = {this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </CharDetails>
        )

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                gotData={this.GotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}