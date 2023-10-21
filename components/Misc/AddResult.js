import React, { useState } from 'react'
import classes from "./AddResult.module.css"
import { Button } from '@mui/material'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { postAddResult, verifyCaptcha } from '@/pages/api';
import { toast } from 'react-toastify';

export default function AddResult() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [club_name, setClubName] = useState("")
    const [contact_person, setContactPerson] = useState("")
    const [designation, setDesignation] = useState("")
    const [contact_number, setContactNumber] = useState("")
    const [email, setEmail] = useState("")
    const [event_name, setEventName] = useState("")
    const [event_result_file, setEventResultFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await executeRecaptcha();
        const response = await verifyCaptcha(token);
        if (response.success && response.score > 0.5) {

            const formData = {
                club_name,
                contact_person,
                designation,
                contact_number,
                email,
                event_name,
                event_result_file,
            }
            postAddResult(formData)

            setClubName("")
            setContactPerson("")
            setDesignation("")
            setContactNumber("")
            setEmail("")
            setEventName("")
        } else {
            toast.error(
                "There was an error verifying you request, please refresh and try again!"
            );
        }

        if (event_result_file) {
            // Perform file upload or further processing
            console.log('Selected file:', event_result_file);
        } else {
            // setErrorMessage('Please select a file before submitting.');
            toast.error('Please select a file before submitting.')
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['application/pdf', 'text/csv'];

        if (file && allowedTypes.includes(file.type)) {
            setEventResultFile(file);
            setErrorMessage('');
        } else {
            setEventResultFile(null);
            //   setErrorMessage('Please select a PDF or CSV file.');
            toast.error('Please select a PDF or CSV file.')
        }
    };

    return (
        <main className={classes["main-section"]}>
            <form onSubmit={handleSubmit} className={classes["AddResult-main-info"]}>
                <div className={classes["AddResult-info-Div"]}>

                    <div className={classes["AddResult-input-Div"]}>
                        <label>Club Name:</label>
                        <input
                            type='text'
                            placeholder='Please Enter Club Name'
                            onChange={(event) => { setClubName(event.target.value) }}
                            required
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Person Name:</label>
                        <input
                            type='text'
                            placeholder='Please Enter Contact Person Name'
                            required
                            onChange={(event) => { setContactPerson(event.target.value) }}
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Designation:</label>
                        <input
                            type='text'
                            placeholder='Please Enter Your Designation '
                            required
                            onChange={(event) => { setDesignation(event.target.value) }}
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Phone:</label>
                        <input
                            type='number'
                            placeholder='Please Enter Phone Number'
                            required
                            onChange={(event) => { setContactNumber(event.target.value) }}
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Email:</label>
                        <input
                            type='email'
                            placeholder='Please Enter Email Address'
                            required
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Event Name:</label>
                        <input
                            type='text'
                            placeholder='Please Enter Event Name'
                            required
                            onChange={(event) => { setEventName(event.target.value) }}
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Upload File:</label>
                        <input
                            type='file'
                            // accept=".pdf, .csv"
                            onChange={handleFileChange}
                        // required
                        />
                    </div>
                    <div className={classes["AddResult-input-Div"]}>
                        <label>Download File:</label>
                        <a href="#" download="MyExampleDoc"
                            className={classes.downloadBtn}>
                            <Button
                                endIcon={<CloudDownloadIcon />}
                            >
                                Download File
                            </Button>
                        </a>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "25px", }}>
                        <Button type="submit" variant="contained" className={classes.SubmitBtn}>
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    )
}
