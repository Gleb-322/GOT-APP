import React, {Component} from 'react';
import {Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
import PropTypes from 'prop-types'

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
const Button = styled.button`
    display: block;
    margin: 0 auto;
    margin-top: 40px;
    background-color: lightblue;
    height: 40px;
    width: 50%;
    border: solid 1px #fff;
    border-radius: 5px;
    outline: none;
    padding: 7px;
`

export default class RandomChar extends Component {

    GotService = new GotService()

    state = {
        char: {},
        loading: true,
        error: false,
        showRandomChar: true
    }

    componentDidMount() {
        this.updateChar()
        this.timerId = setInterval(this.updateChar, this.props.interval)
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

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onToggleRandomChar = () => {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25) /* дипазон от 25 до 140 */
        this.GotService.getCharacter(id)   
        .then(this.onCharLoaded) 
        .catch(this.onError)
    }

    render() {
        const {char, loading, error, showRandomChar} = this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null
        if (showRandomChar) {
            return (
                <Row>
                    <Col lg={{size: 12, offset: 0}}>
                        <RandomBlock className="rounded"> 
                            {errorMessage}
                            {spinner}
                            {content}
                        </RandomBlock>
                        <Button
                            onClick={this.onToggleRandomChar}>
                            Toggle random Character
                        </Button>
                    </Col>
                </Row>
                
            )
        } else {
            return (
                <Row>
                    <Col lg={{size: 12, offset: 0}}>
                        <Button
                            onClick={this.onToggleRandomChar}>
                            Toggle random Character
                        </Button>
                    </Col>
                </Row>
            )
        }
    }
}

RandomChar.defaultProps = {
    interval: 1500
}

// RandomChar.propTypes = {
//     interval: (props, propName, componentName) => {
//         const value = props[propName]
//         if (typeof value === 'number' && !isNaN(value)) {
//             return null
//         } 
//         return new TypeError(`${componentName}: ${propName} must be a number`)
//     }
// }

RandomChar.propTypes = {
    interval: PropTypes.number
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
