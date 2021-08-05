import React from 'react'
import styled from 'styled-components'

const ErrorBlock = styled.div`
    display: block;
    margin: 0 auto;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    margin-top: 40px;
    span {
        display: block;
        text-align: center; 
    }
`

const ErrorMessage = () => {
    return (
        <ErrorBlock>
            <span>Sorry, something goes wrong...</span>
        </ErrorBlock>
    )
}

export default ErrorMessage