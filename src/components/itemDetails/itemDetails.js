import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import styled from 'styled-components'
import ErrorMessage from '../errorMessage'
import Spinner from '../spinner'


const ItemDetail = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`
const SelectError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

const Term = styled.span`
    font-weight: bold;
`


const Field = ({items, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <Term>{label}</Term>
            <span>{items[field]}</span>
        </ListGroupItem>
    )
}
export {Field}

export default class ItemDetails extends Component {

    state = {
        items: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    onError = () => {
        this.setState({
            items: null,
            error: true
        })
    }

    onItemLoaded = (items) => {
        this.setState({
            items,
            loading: false
        })
    }

    updateItem() {
        const {itemId, gotData} = this.props

        if (!itemId) {
            return
        }

        gotData(itemId)
        .then((items) => {
            this.onItemLoaded(items)
        })
        .catch(() => {
            this.onError()
        })

        
    }

    render() {
        const {loading, error, items} = this.state
        
        if (error && !items) {
            return <ErrorMessage/>
        } else if (!items) {
            return (
                <SelectError>Please select a Item in the list</SelectError>
            )
        } else if (loading) {
            return (
                <ItemDetail className="rounded">
                    <Spinner/>
                </ItemDetail>
            )
        }

        const {name} = items

        return (
            <ItemDetail className="rounded">
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {items})
                        })
                    }
                </ListGroup>
            </ItemDetail>
        )
    }
}