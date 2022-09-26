import React from 'react'
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import CrewCard from './CrewCard'
import img1 from '../assets/imgs/fc1.jpeg';
import img2 from '../assets/imgs/fc2.jpeg';
import img3 from '../assets/imgs/fc3.jpeg';
import img4 from '../assets/imgs/fc4.jpeg'
const data = [
    {
        title: 'Team Technology',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img1
    },

    {
        title: 'Team Engineering',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img2
    },
    {
        title: 'Team Product Manager',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img3
    },
    {
        title: 'Team Blockchain',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img4
    },
    {
        title: 'Team Design',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img1
    },
    {
        title: 'Team Manager',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi quae maxime, deleniti reprehenderit ex rerum harum unde, non quisquam delectus ab architecto animi nam, earum fugiat ullam. Quisquam, amet.',
        img: img2
    },
]
const SliderSection = () => {
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });
    return (
        <div className='slider-section'>
            <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    pathLength="1"
                    className="indicator"
                    style={{ pathLength: scrollXProgress }}
                />
            </svg>
            <div ref={ref} className='slider-section__card-container'>
                {data.map((data, key) => (
                    <CrewCard
                        key={key}
                        title={data.title}
                        img={data.img}
                        description={data.description}
                    />
                ))}
            </div>
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollXProgress }}
            />
        </div>
    )
}

export default SliderSection