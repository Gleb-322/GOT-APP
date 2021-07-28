import React, {Component} from 'react';
import styled from 'styled-components';

const ListGroupItem = styled.li`
    cursor: pointer;
`

export default class ItemList extends Component {

    render() {
        return (
            <ul className="item-list list-group">
                <ListGroupItem className="list-group-item">
                    John Snow
                </ListGroupItem>
                <ListGroupItem className="list-group-item">
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem className="list-group-item">
                    Geremy
                </ListGroupItem>
            </ul>
        );
    }
}