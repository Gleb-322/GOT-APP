import React, { Component } from 'react'
import {Col, Row, Container } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import CharacterPage from '../charPage';
import ErrorMessage from '../errorMessage'
import styled from 'styled-components';

const Button = styled.button`
    margin-bottom: 40px;
    background-color: lightblue;
    height: 40px;
    width: 60%;
    border: solid 1px #fff;
    border-radius: 5px;
    outline: none;
    padding: 7px;
`


export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onToggleRandomChar = () => {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }


    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button
                                onClick={this.onToggleRandomChar}>
                                Toggle random Character
                            </Button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                </Container>
            </>
        )
    }
}
