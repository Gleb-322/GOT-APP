import React, {Component} from 'react'
import Spinner from '../spinner'
import styled from 'styled-components'
import ErrorMessage from '../errorMessage'


const ListGroupItem = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }


    componentDidMount() {
        const {gotData} = this.props
        gotData()
        .then((itemList) => {
            this.setState({
                itemList,
                error: false
            })
        })
        .catch(() => {
            this.onError()
        })
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError = () => {
        this.setState({
            itemList: null,
            error: true
        })
    }


    renderItem(arr) {
        return arr.map((item) => {
            const {id} = item
            const label = this.props.renderItem(item)
            return (
                <ListGroupItem 
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                    className="list-group-item">
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {itemList, error} = this.state

        if (error) {
            return <ErrorMessage/>
        }
        
        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItem(itemList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }
}