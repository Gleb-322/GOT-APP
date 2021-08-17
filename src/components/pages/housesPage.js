import React, {Component} from 'react'
import {ItemListHouses} from '../itemList'
import ItemDetails, {Field} from '../itemDetails'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock'


export default class HousesPage extends Component {

    GotService = new GotService()

    state = {
        selectedHouse: null,
        error: false
    }

    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                gotData={this.GotService.getHouse}
                itemId = {this.state.selectedHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )

        const itemList = (
            <ItemListHouses 
                onItemSelected={this.onHouseSelected}
                renderItem={(item) => item.name}
            />
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}