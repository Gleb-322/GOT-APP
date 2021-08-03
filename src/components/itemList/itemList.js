import React, {Component} from 'react'
import GotService from '../../services/gotService'
import Spinner from '../spinner'
import styled from 'styled-components'


const ListGroupItem = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {
    GotService = new GotService()

    state = {
        charList: null
    }

    componentDidMount() {
        this.GotService.getAllCharacters()
        .then((charList) => {
            this.setState({
                charList
            })
        })
    }

    renderItem(arr) {
        return arr.map((item, i) => {
            return (
                <ListGroupItem 
                    key={i}
                    onClick={() => this.props.onCharSelected(41 + i)}
                    className="list-group-item">
                    {item.name}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {charList} = this.state
        if (!charList) {
            return <Spinner/>
        }
        const item = this.renderItem(charList)
        return (
            <ul className="item-list list-group">
                {item}
            </ul>
        )
    }
}