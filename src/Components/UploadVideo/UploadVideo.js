import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Success from '../SuccessPage/SuccessPage';

function UploadVideo() {

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [FilePath, setFilePath] = useState("");
    const [Thumbnail, setThumbnail] = useState("")
    const [Succ, setSucc] = useState(1)

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('https://fcjvideoplatform.herokuapp.com/addVideo',{Title,Description,FilePath,Thumbnail})
        .then(response => {
            if(response.data.success){
                setSucc(0)
            }else{
                alert('Failed upload the video')
            }
        })
    }

    const HandleTitle = (e) => {
        setTitle(e.target.value);
    }

    const HandleDescription = (e) => {
        setDescription(e.target.value);
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 
                'Access-Control-Allow-Origin': '*',
                'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('https://fcjvideoplatform.herokuapp.com/uploadVideo', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    console.log(variable)

                    //gerenate thumbnail with this filepath !

                    axios.post('https://fcjvideoplatform.herokuapp.com/thumbnail', variable,)
                        .then(response => {
                            if (response.data.success) {
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })
    }
    return (
        <div>
            {
                Succ ? <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
                    <h2> Upload Video</h2>
                </div>
    
                <form onSubmit={onSubmit}>
                        {
                            Thumbnail === ""?
                            <div style={{ marginLeft: "480px" }}>
                                <Dropzone
                                onDrop={onDrop}
                                multiple={false}
                                maxSize={800000000}>
                                {({ getRootProps, getInputProps }) => (
                                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <i className="fa-solid fa-plus mx-6" style={{ fontSize: "60px" }}></i>
    
                                    </div>
                                )}
                                </Dropzone>
                            </div>
                            :
                            <img src={`https://fcjvideoplatform.herokuapp.com/${Thumbnail}`} alt="haha" />
                        }
    
                    <br /><br />
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" value={Title} onChange={HandleTitle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={Description} onChange={HandleDescription}></textarea>
                    </div>
                    <br /><br />
    
                    <button type="primary" size="large" onClick={onSubmit}>
                        Submit
                    </button>
    
                </form>
            </div> :
            <Success/>
            }
        </div>
    )
}

export default UploadVideo