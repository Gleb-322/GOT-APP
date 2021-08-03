import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import GotService from '../../services/gotService'
import styled from 'styled-components'


const CharacterDetails = styled.div`
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


export default class CharDetails extends Component {
    GotService = new GotService()

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar() {
        const {charId} = this.props

        if (!charId) {
            return
        }

        this.GotService.getCharacter(charId)
        .then((char) => {
            this.setState({char})
        })

        this.foo.bar = 0
    }

    render() {
        if (!this.state.char) {
            return (
                <SelectError>Please select a Character</SelectError>
            )    
        }
        const {name, gender, born, died, culture} = this.state.char

        return (
            <CharacterDetails className="rounded">
                <h4>{name}</h4>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Born</Term>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Died</Term>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Culture</Term>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
            </CharacterDetails>
        )
    }
}