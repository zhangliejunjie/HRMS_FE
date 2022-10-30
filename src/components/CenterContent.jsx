import React from 'react'
import '../sass/components/_centercontent.scss'


export default function CenterContent({ embedId }) {
    return (
        <div className='center-content'>
            <h2 className='center-content__text'>
                We Celebrate Open Communication, Positive Environments, and Love for Innovation!
            </h2>
            <div className='center-content__video'>
                <iframe
                    width="1033"
                    height="600"
                    src={`https://www.youtube.com/embed/${embedId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        </div>
    )
}
