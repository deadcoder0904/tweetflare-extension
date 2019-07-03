import React, { Component } from 'react'
import axios from 'axios'
import FlareIcon from '../Buttons/FlareIcon'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetId: this.props.tweetId,
      username: this.props.user,
      thread: []
    }
  }

  getFlare = async (user, tweetId) => {
    const getFlare = await axios.get(
      `http://localhost:4000/flare/${user}/${tweetId}`
    )
    console.log(getFlare)
    if (getFlare) {
      this.setState({
        thread: getFlare.data.thread
      })
    }
    return getFlare
  }

  componentDidMount() {
    this.getFlare(this.props.user, this.props.tweetId)
  }

  render() {
    return (
      <div id="flare-wrapper">
        <header className="app--header">
          <FlareIcon className="app--logo" size="30" color="#FF6D70" />
          <h1 className="app--title">
            tweet<b>flare</b>
            <br></br>
            {this.state.tweetId}
          </h1>
        </header>
        <main className="app--content">
          <ul>
            {this.state.thread.map((tweet, index) => (
              <li key={index}>
                {tweet.tweetId} | {tweet.user.name}
              </li>
            ))}
          </ul>
        </main>
        <footer className="app--footer">
          <p>&copy; 2019 </p>
        </footer>
      </div>
    )
  }
}

export default App
