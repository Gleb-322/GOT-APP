import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from '../header'
import RandomChar from '../randomChar'
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './app.css'




export default class App extends Component {
    GotService = new GotService()

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Route path='/' exact component={() => <h1 className='title'>Welcome to the best web Application for universe <br/> The Game Of Thrones</h1>} />
                        <Route path='/randomChar' component={RandomChar}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                                ({match}) => {
                                    const {id} = match.params
                                    return <BooksItem bookId={id}/>
                                }
                            }/>
                    </Container>
                </div>
            </Router>
        )
    }
}
