import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios';
import ViewVideo from "../ViewVideo/ViewVideo";

function SuccessPage() {

    const [Video, setVideo] = useState(null);

    const getVideo = () => {
        axios.get('https://fcjvideoplatform.herokuapp.com/getVideo')
            .then((response) => {
                if (response.data.success) {
                    // response.data.VideoData.forEach(person => {
                    //     console.log(person._id + ': ' + person.FilePath);
                    // });
                    setVideo(response.data.VideoData);
                } else {
                    alert("can't fetch data from server")
                }
            })
    }


    useEffect(() => {
        getVideo();
    }, [])

    return (
    <>
            <h5 style={{ textAlign: 'center' }}>Success Uploaded</h5>
            <a href="/">Again Uploading</a>
            <div className="row">
            {
                Video === null ?
                <h2 style={{ textAlign: 'center' }}>There is no Video uploaded till now</h2>
                :
                <h2 style={{ textAlign: 'center' }}>Uploaded Video</h2>
            }
          {Video &&
            Video.map((message) => {
              return (
                <>
                <div className="col-md-4" key={message._id}>
                  <ViewVideo
                    FilePath = {message.FilePath} Title = {message.Title} Description = {message.Description}
                    Thumbnail = {message.Thumbnail}
                  />
                </div>
                </>
              );
            })}
        </div>
    </>
            )
}

            export default SuccessPage