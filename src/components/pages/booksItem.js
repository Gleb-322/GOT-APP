import React, { Component } from 'react'
import GotService from '../../services/gotService'
import ItemDetails, {Field} from '../itemDetails'

export default class BooksItem extends Component {
    GotService = new GotService()

    render() {
        return (
            <ItemDetails 
                gotData={this.GotService.getBook}
                itemId = {this.props.bookId}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}
