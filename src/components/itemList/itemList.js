import React, {Component} from 'react'
import GotService from '../../services/gotService'
import Spinner from '../spinner'
import styled from 'styled-components'
import ErrorMessage from '../errorMessage'


const ListGroupItem = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {
    GotService = new GotService()

    state = {
        charList: null, 
        error: false
    }


    componentDidMount() {
        this.GotService.getAllCharacters()
        .then((charList) => {
            this.setState({
                charList,
                error: false
            })
        })
        .catch(() => {
            this.onError()
        })
    }

    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }

    onError = () => {
        this.setState({
            charList: null,
            error: true
        })
    }


    renderItem(arr) {
        return arr.map((item) => {
            const {id, name} = item
            return (
                <ListGroupItem 
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}
                    className="list-group-item">
                    {name}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {charList, error} = this.state

        if (error) {
            return <ErrorMessage/>
        }
        
        if (!charList) {
            return <Spinner/>
        }
        const items = this.renderItem(charList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}