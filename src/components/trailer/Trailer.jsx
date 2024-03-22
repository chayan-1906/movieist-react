import {useParams} from 'react-router-dom'
import './Trailer.css'
import ReactPlayer from 'react-player'

const Trailer = () => {
    let params = useParams()
    let key = params.ytTrailerId

    return (
        <div className='react-player-container'>
            {
                (key !== null) && (
                    <ReactPlayer
                        controls
                        playing
                        url={`https://www.youtube.com/watch?v=${key}`}
                        width='100%'
                        height='100%'
                    />
                )
            }
        </div>
    )
}

export default Trailer