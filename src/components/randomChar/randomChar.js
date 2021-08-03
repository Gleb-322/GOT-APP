import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    img {
        width: 100%;
    }
`

const Term = styled.span`
    font-weight: bold;
`


export default class RandomChar extends Component {

    GotService = new GotService()

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar()
        this.timerId = setInterval(this.updateChar, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25) /* дипазон от 25 до 140 */
        this.GotService.getCharacter(id)   
        .then(this.onCharLoaded) 
        .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null
        return (
            <RandomBlock className="rounded"> 
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char
    return (
        <>
            <h4>Random Character: {name}</h4>
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
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}
