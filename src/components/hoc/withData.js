import React, {Component} from 'react'
import Spinner from '../spinner'
import ErrorMessage from '../errorMessage'


const withData = (View, gotData) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        }
    
        componentDidMount() {
            gotData()
            .then((data) => {
                this.setState({
                    data,
                    error: false
                })
            })
            .catch(() => {
                this.onError()
            })
        }
    
        componentDidCatch(){
            this.setState({
                data: null,
                error: true
            })
        }
    
        onError = () => {
            this.setState({
                data: null,
                error: true
            })
        }

        render() {
                const {data, error} = this.state

            if (error) {
                return <ErrorMessage/>
            }
            
            if (!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data}/>
        }
    
    }
} 

export default withData