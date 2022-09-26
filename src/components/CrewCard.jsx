import React from 'react'
import PropTypes from 'prop-types'
import { motion, useScroll } from "framer-motion";
const CrewCard = ({ title, description, img }) => {
    return (
        <div className='crew-card'>
            <div className='crew-card__img-container'>
                <img src={img} alt="" />
            </div>
            <div className='crew-card__content'>
                <h3 className='crew-card__content__title'>{title}</h3>
                <p className='crew-card__content__description'>{description}</p>
            </div>
        </div>
    )
}

CrewCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}

export default CrewCard