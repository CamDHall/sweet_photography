import React, { useState } from 'react';
import '../styles/booking.scss';

const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");

firebase.initializeApp({
    apiKey: "AIzaSyCoOgi9QyVCvbP2D2YI2AwtEZBFYkpcBhY",
    authDomain: "sweet-photography.firebaseapp.com",
    databaseURL: "https://sweet-photography.firebaseio.com",
    projectId: "sweet-photography",
    storageBucket: "sweet-photography.appspot.com",
    messagingSenderId: "770786476868",
    appId: "1:770786476868:web:0ad67f4a8568a7c637cd11",
    measurementId: "G-TPXLMFFXP0"
  });

var functions = firebase.functions();


function BookingContainer() {
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function Book(event: any) {
        event.preventDefault();
        setIsSubmittingForm(true);

        const formData = new FormData(event.target);
        const formValues: ContactFormData = {
            fname: formData.get("fname")?.toString() ?? "",
            lname: formData.get("lname")?.toString() ?? "",
            email: formData.get("email")?.toString() ?? "",
            phone: Number(formData.get("phone")),
            numberOfDogs: Number(formData.get("numberOfDogs")),
            comments: formData.get("comment")?.toString() ?? ""
        };

        const dataHtml = `<h1>Contact form from ${formValues.fname}  ${formValues.lname}</h1>
                            <ul>
                                <li>Email: ${formValues.email}</li>
                                <li>Number of Dogs: ${formValues.numberOfDogs}</li>
                                <li>Phone: ${formValues.phone}</li>
                                <li>Comments: ${formValues.comments}</li>
                            </ul>`;
        
        const formElement = document.getElementById(event.target.id) as HTMLFormElement;

        var sendEmail = firebase.functions().httpsCallable("sendEmail");
        sendEmail(dataHtml, formValues.email).then(function(result: any) {
            if(result) {
                setIsSubmittingForm(false);   
                setSubmitted(true);
            }
        });

    }

    if(submitted) {
        return <h1 className="submitted">Thank you. I will contact you within 2 business days.</h1>;
    }

    return (
        <div className={submitted ? "wrapper close-booking" : "wrapper"}>
            <div className="flex-text">
                <h1>Bookings available in San Antonio.</h1>
                <p>Please fill out the form below and I will contact you within the next 2 business days.</p>
            </div>
            <form onSubmit={Book} id="booking-form">
                <div className="form-col">
                    <label>First Name</label>
                    <input required type="text" name="fname" aria-required="true" aria-label="First Name" minLength={3} />
                </div>
                <div className="form-col">
                    <label>Last Name</label>
                    <input required type="text" name="lname" aria-required="true" aria-label="Last Name" minLength={3} />
                </div>
                <div className="form-col">
                    <label>Email</label>
                    <input required type="email" name="email" aria-required="true" aria-label="Email" />
                </div>
                <div className="form-col">
                    <label>Phone Number</label>
                    <input required type="number" name="phone" aria-required="true" aria-label="Phone Number" pattern="[0-9]{10}"/>
                </div>

                <span className="divider" />

                <div className="form-col">
                    <label>Number of Dogs</label>
                    <input required type="number" name="numberOfDogs" aria-required="true" aria-label="Number of Dogs" />
                </div>
                <div className="form-col">
                    <label>Comments</label>
                    <input type="text" name="comment" aria-required="true" aria-label="Comments" />
                </div>
                <button disabled={isSubmittingForm} type="submit">
                    {isSubmittingForm ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default BookingContainer;

class ContactFormData {
    fname: string = "";
    lname: string = "";
    email: string = "";
    phone: number = 0;
    numberOfDogs: number = 0;
    comments: string = "";
}