import React from 'react'
import styled from 'styled-components'


const ListGroupItem = styled.li`
    cursor: pointer;
`

const ItemList = ({data, onItemSelected, renderItem}) => {
    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item
            const label = renderItem(item)
            return (
                <ListGroupItem 
                    key={id}
                    onClick={() => onItemSelected(id)}
                    className="list-group-item">
                    {label}
                </ListGroupItem>
            )
        })
    }
    const items = renderItems(data)
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    )
}

export default ItemList
