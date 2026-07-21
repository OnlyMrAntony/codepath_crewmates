import { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import more from './more.png'

const Card = (props) =>  {

        const makeSlug = (name) => {
        if (!name) return ''
        return name
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }

        const slug = makeSlug(props.name)

        return (
            <div className="Card">
                <Link to={`/crewmate/${props.id}/${slug}`}>
                    <h2 className="name">{props.name}</h2>
                </Link>

                    <div className="card-body">
                        <h3 className="speed">{props.speed + 'mph'}</h3>
                        <h3 className="color">{props.color}</h3>
                    </div>

                    <div className="card-actions">
                        <Link to={`/edit/${props.id}`} className="edit-btn">Edit</Link>
                        <Link to={`/edit/${props.id}`} className="more-link">
                            <img className="moreButton" alt="edit button" src={more} />
                        </Link>
                    </div>
            </div>
    );
};

export default Card