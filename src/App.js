import {Component} from 'react'
import Popup from 'reactjs-popup'
import {BsX} from 'react-icons/bs'
import Rpc from './components/Game'
import {Paragraph, Heading} from './components/StyledComponents/index'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    clicked: true,
    imgUrl: '',
    score: 0,
    randomImageUrl: '',
    statusText: '',
  }

  renderHomePage = () => {
    const {score} = this.state
    return (
      <div>
        <br />
        <div className="head-border">
          <div className="heads">
            <Heading>
              Rock <br />
              Paper
              <br />
              Scissors
            </Heading>
          </div>
          <div className="score-card">
            <p>Score</p>
            <Paragraph>{score}</Paragraph>
          </div>
        </div>
      </div>
    )
  }

  ShowGame = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  getImageUrl = url => {
    this.setState(prevState => ({imgUrl: url, clicked: !prevState.clicked}))
  }

  changeState = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  renderGameResult = () => {
    const {randomImageUrl, statusText} = this.state
    const {imgUrl} = this.state

    return (
      <div className="results">
        <div className="flex-result">
          <div className="you">
            <p>YOU</p>
            <img className="result-images" src={imgUrl} alt="your choice" />
          </div>
          <div className="you">
            <p>OPPONENT</p>
            <img
              className="result-images"
              src={randomImageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <div>
          <p className="status">{statusText}</p>
          <button onClick={this.changeState} className="play" type="button">
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  receiveRandomImage = result => {
    const {randomImage, userImage} = result
    const {id} = userImage
    const rImg = randomImage.imageUrl
    const rId = randomImage.id
    this.setState({randomImageUrl: rImg})
    if (id === 'PAPER' && rId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        statusText: 'YOU WON',
      }))
    }
    if (id === 'SCISSORS' && rId === 'ROCK') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        statusText: 'YOU LOSE',
      }))
    }
    if (id === 'ROCK' && rId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        statusText: 'YOU LOSE',
      }))
    }
    if (id === 'SCISSORS' && rId === 'PAPER') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        statusText: 'YOU WON',
      }))
    }
    if (id === 'ROCK' && rId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        statusText: 'YOU WON',
      }))
    }
    if (id === 'PAPER' && rId === 'SCISSORS') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        statusText: 'YOU LOSE',
      }))
    }
    if (id === rId) {
      this.setState({statusText: 'IT IS DRAW'})
    }
  }

  renderCards = () => (
    <div className="cards">
      <ul className="list-items">
        {choicesList.map(each => (
          <Rpc
            getState={this.updateState}
            getUrl={this.getImageUrl}
            details={each}
            key={each.id}
            list={choicesList}
            getRandomDetails={this.receiveRandomImage}
          />
        ))}
      </ul>
    </div>
  )

  reactPopUp = () => (
    <div className="pop-container">
      <Popup
        modal
        trigger={
          <button type="button" className="pop-btn">
            RULES
          </button>
        }
      >
        {close => (
          <div className="rules-div">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => close()}
            >
              <BsX className="cancel-icon" />
            </button>
            <img
              className="rules-img"
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </div>
        )}
      </Popup>
    </div>
  )

  render() {
    const {clicked} = this.state

    return (
      <div className="home-bg">
        {this.renderHomePage()}
        {clicked ? this.renderCards() : this.renderGameResult()}
        <div className="pop-position">{clicked ? this.reactPopUp() : ''}</div>
      </div>
    )
  }
}
export default App
