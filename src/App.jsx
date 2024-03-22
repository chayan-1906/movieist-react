import './App.css'
import {useEffect, useState} from 'react'
import api from './api/axiosConfig.jsx'
import {Route, Routes} from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/home/Home.jsx'
import Header from './components/header/Header.jsx'
import Trailer from './components/trailer/Trailer.jsx'
import Reviews from "./components/reviews/Reviews.jsx";
import NotFound from "./components/not-found/NotFound.jsx";

function App() {
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState()
    const [reviews, setReviews] = useState([])

    const getMovies = async () => {
        console.log('getMovies called')
        try {
            const response = await api.get('/api/v1/movies')
            console.log(response.data)
            setMovies(response.data)
        } catch (error) {
            console.log(`error in getMovies - ${error}`)
        }
    }

    const getMovieData = async (movieId) => {
        try {
            const response = await api.get(`/api/v1/movies?imdbId=${movieId}`)
            const singleMovie = response.data
            console.log(`singleMovie: ${JSON.stringify(singleMovie.reviewIds)}`)
            setMovie(singleMovie)
            setReviews(singleMovie.reviewIds)
        } catch (e) {
            console.log(`getMovieData error: ${e}`)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className='App'>
            <Header/>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='/' element={<Home movies={movies}/>}/>
                    <Route path='/trailer/:ytTrailerId' element={<Trailer/>}/>
                    <Route path='/reviews/:movieId'
                           element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews}
                                             setReviews={setReviews}/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App