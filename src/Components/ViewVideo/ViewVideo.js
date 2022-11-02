import React from 'react'
import "/node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

function ViewVideo(props) {

    return (
        <div className="card">
            <Player
            playsInline
            poster={`http://localhost:4000/${props.Thumbnail}`}
            src={`http://localhost:4000/${props.FilePath}`}
            />
            <div className="card-body">
                <h5 className="card-title">{props.Title}</h5>
                <p className="card-text">{props.Description}</p>
            </div>
    </div>
    );
}

export default ViewVideo