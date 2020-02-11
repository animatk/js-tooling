import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  render() {
    const {
      count,
    } = this.state

    return (
      <div>
        <h1>Hello World!</h1>
        <h2>{`Count:  ${count}`}</h2>
        <button type="button" onClick={() => this.setState({ count: count + 1 })}> + </button>
        <button type="button" onClick={() => this.setState({ count: count - 1 })}> - </button>
      </div>
    )
  }
}

export default App
