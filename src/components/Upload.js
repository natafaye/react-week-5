import Alert from 'react-bootstrap/Alert';
import React, { useState } from 'react'
import { uploadFile } from '../services/FileUploadService';

const [IDLE, UPLOADING, SUCCESS, FAILURE, VALIDATION_ERROR] = [ 0, 1, 2, 3, 4 ];

export default function Upload() {
    const [status, setStatus] = useState(IDLE);
    const [statusMessage, setStatusMessage] = useState(null);
    const [files, setFiles] = useState(null);

    const isImage = (file) => {
        const ext = ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.svg'];
        return ext.some(el => file.name.toLowerCase().endsWith(el));
    }

    const validateFileInput = (target) => {
        if(target.files.length === 0) {
            setStatus(VALIDATION_ERROR);
            setStatusMessage("You must select a file to upload.");
            return false;
        }
        else if(Array.from(target.files).some(file => !isImage(file))) {
            setStatus(VALIDATION_ERROR);
            setStatusMessage("You can only upload image files.");
            return false;
        }
        setStatus(IDLE);
        setStatusMessage(null);
        return true;
    }

    const filesChangeHandler = (e) => {
        if(validateFileInput(e.target)) {
            setFiles(e.target.files);
        }
    }

    const uploadHandler = async () => {
        setStatus(UPLOADING);
        setStatusMessage(null);

        const fileData = new FormData();
        Array.from(files).forEach(
            (file, index) => fileData.append(`file-${index}`, file, file.name)
        );
        const resp = await uploadFile(fileData);

        setStatus( (resp.success) ? SUCCESS : FAILURE );
        setStatusMessage( (resp.success) ? "File was successfully uploaded" : `Error: ${resp.data.message}` );
    }

    return (
        <div className="container-fluid mt-3 px-3">
            { (!statusMessage) ? "" :
                <div className="row">
                    <div className="col">
                        <Alert variant={ (status === SUCCESS) ? "success" : "danger" }>
                            { statusMessage }
                        </Alert>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-6">
                    <h3 className="mb-3">Upload a File</h3>
                    <input type="file" multiple
                        className={ (status !== VALIDATION_ERROR) ? "form-control" : "form-control is-invalid" }
                        onChange={filesChangeHandler}/>
                    <button 
                        className="btn btn-success mt-3" 
                        disabled={ status === UPLOADING || status === VALIDATION_ERROR || files === null } 
                        onClick={uploadHandler}>{ (status === UPLOADING) ? "Uploading..." : "Upload" }</button>
                </div>
            </div>
        </div>
    )
}
