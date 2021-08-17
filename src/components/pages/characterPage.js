import React, {Component} from 'react'
import {ItemListChars} from '../itemList'
import ItemDetails, {Field} from '../itemDetails'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'


export default class CharacterPage extends Component {

    GotService = new GotService()

    state = {
        selectedChar: null,
        error: false
    }

    onCharSelected = (id) => {
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

        const itemDetails = (
            <ItemDetails 
                gotData={this.GotService.getCharacter}
                itemId = {this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        const itemList = (
            <ItemListChars 
                onItemSelected={this.onCharSelected}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}