import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import GotService from '../../services/gotService'
import styled from 'styled-components'
import ErrorMessage from '../errorMessage'
import Spinner from '../spinner'


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
        char: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    onError = () => {
        this.setState({
            char: null,
            error: true
        })
    }

    onLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props

        if (!charId) {
            return
        }

        this.GotService.getCharacter(charId)
        .then((char) => {
            this.onLoaded(char)
        })
        .catch(() => {
            this.onError()
        })

        
    }

    render() {
        const {loading, error, char} = this.state
        
        if (error && !char) {
            return <ErrorMessage/>
        } else if (!char) {
            return (
                <SelectError>Please select a Character</SelectError>
            )
        } else if (loading) {
            return (
                <CharacterDetails className="rounded">
                    <Spinner/>
                </CharacterDetails>
            )
        }

        const {name, gender, born, died, culture} = char

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