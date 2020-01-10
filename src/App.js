import React from 'react'

class App extends React.Component {
    state = {
        count: 0
    }
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <h2>count: {this.state.count}</h2>
                <button onClick={() => this.setState({count: this.state.count + 1})}> + </button>
                <button onClick={() => this.setState({count: this.state.count - 1})}> - </button>
            </div>
        )
    }
}

export default App