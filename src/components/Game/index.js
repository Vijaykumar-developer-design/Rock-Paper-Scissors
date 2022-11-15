import './index.css'

const Rpc = props => {
  const {details, getUrl, list, getRandomDetails} = props

  const {id, imageUrl} = details
  let text = null
  if (id === 'ROCK') {
    text = 'rockButton'
  }
  if (id === 'SCISSORS') {
    text = 'scissorsButton'
  }
  if (id === 'PAPER') {
    text = 'paperButton'
  }

  const sendUrl = () => {
    getUrl(imageUrl)

    const randomImgIndex = Math.floor(Math.random() * list.length)
    const randomImage = list[randomImgIndex]
    const userImage = {imageUrl, id}
    const both = {randomImage, userImage}
    getRandomDetails(both)
  }
  const renderClicks = () => (
    <div className="games">
      <li>
        <button
          data-testid={text}
          onClick={sendUrl}
          className="btn"
          type="button"
        >
          <img className="game-imgs" src={imageUrl} alt={id} />
        </button>
      </li>
    </div>
  )

  return <div>{renderClicks()}</div>
}
export default Rpc
