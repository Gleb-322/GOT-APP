import React, {Component} from 'react'
import {ItemListBooks} from '../itemList'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import { withRouter } from 'react-router-dom'


class BooksPage extends Component {

    GotService = new GotService()

    state = {
        error: false
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

        return (
            <ItemListBooks 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                renderItem={(item) => item.name}
            />
        )
    }
}

export default withRouter(BooksPage)