import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"


const apiKey = "05ce5b4aeab3210263d818711daa7cd7"
const url = "https://api.themoviedb.org/3"
const imgurl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming"
const nowplaying = "now_playing"
const popular = "popular"
const toprated = "top_rated"


const Card = ({ img }) => (
    <img className='card' src={img} alt="cover" />
)


const Row = ({ title, arr = [] }) => (


    <div className='row'>
        <h2>{title}</h2>
        <div>
            {
                arr.map((item) => (
                    <Card img={`${imgurl}/${item.poster_path}`} />
                )
                )
            }
        </div>
    </div>
)


const Home = () => {

    const [upcomingmovies, setupcomingmovies] = useState([]);
    const [nowplayingmovies, setnowplayingmovies] = useState([]);
    const [popularmovies, setpopularmovies] = useState([]);
    const [topratedmovies, settopratedmovies] = useState([]);



    useEffect(() => {
        const fetchUpcoming = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
            setupcomingmovies(results);
        };

        const fetchnowplaying = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${nowplaying}?api_key=${apiKey}`)
            setnowplayingmovies(results);
        };

        const fetchpopular = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
            setpopularmovies(results);
        };

        const fetchtoprated = async () => {
            const { data: { results } } = await axios.get(`${url}/movie/${toprated}?api_key=${apiKey}`)
            settopratedmovies(results);
        };


        fetchUpcoming()
        fetchnowplaying()
        fetchpopular()
        fetchtoprated()
    }, [])

    return (
        <section className='home'>
            <div className='banner' style={{
                    backgroundImage: popularmovies[0]
                        ? `url(${`${imgurl}/${popularmovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
                }}
            >
                {popularmovies[0] && <h1>{popularmovies[0].original_title}</h1>}
                {popularmovies[0] && <p>{popularmovies[0].overview}</p>}

                <div className='butto'>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>


            </div>
            <Row title={"Upcoming Movies"} arr={upcomingmovies} />
            <Row title={"Now Playing Movies"} arr={nowplayingmovies} />
            <Row title={"Popular Movies"} arr={popularmovies} />
            <Row title={"Top Rated Movies"} arr={topratedmovies} />
        </section>
    )
}

export default Home