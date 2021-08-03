import React from 'react'
import img from './error.jpg'
import styled from 'styled-components'

const ErrorBlock = styled.div`
    display: block;
    margin: 0 auto;
    width: 50%;
    height: 500%;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    margin-top: 40px;
    span {
        display: block;
        text-align: center; 
    }
    img {
        width: 100%;
    }
`

const ErrorMessage = () => {
    return (
        <ErrorBlock>
            <img src={img} alt="error"></img>
            <span>Sorry, something goes wrong...</span>
        </ErrorBlock>
    )
}

export default ErrorMessage