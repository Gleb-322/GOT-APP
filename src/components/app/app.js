import React, { Component } from 'react'
import {Col, Row, Container } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import CharacterPage from '../charPage'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import ItemList from '../itemList'
import CharDetails from '../charDetails'
import styled from 'styled-components'

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
    GotService = new GotService()

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
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                gotData={this.GotService.getAllBooks}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                gotData={this.GotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
