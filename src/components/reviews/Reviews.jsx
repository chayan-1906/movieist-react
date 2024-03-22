import {useParams} from 'react-router-dom'
import {useEffect, useRef} from 'react';
import {Col, Container, Row} from 'react-bootstrap'
import ReviewForm from '../review-form/ReviewForm.jsx'
import api from '../../api/axiosConfig.jsx'

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef()
    let params = useParams()
    const movieId = params.movieId

    const addReview = async (e) => {
        e.preventDefault()
        const rev = revText.current
        try {
            const response = await api.post('/api/v1/reviews', {reviewText: rev.value, imdbId: movieId})
            const updatedReview = [...reviews, {body: rev.value}]
            rev.value = ''
            setReviews(updatedReview)
        } catch (e) {
            console.log(`addReview error: ${e}`)
        }
    }

    useEffect(() => {
        getMovieData(movieId)
        console.log(`reviews: ${reviews}`)
    }, [])

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <img src={movie?.poster} alt=''/>
                </Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText='Write a review?'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr/>
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((review) => {
                        return (
                            <div key={review.id}>
                                <Row>
                                    <Col>{review.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr/>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews