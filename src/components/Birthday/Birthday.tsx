import { useState } from "react";
import { DateNameUserInput } from "./DateNameUserInput";
import ImageViewer from "../marsPhotoViewer/ImageViewer";
import { ImageSelector } from "../marsPhotoViewer/ImageSelector";
import { BirthdayYearDropdown } from "./BirthdayYearDropdown";
import { useRef } from "react";
import './Birthday.scss'
import PdfButton from "./PdfButton";
import {useReactToPrint} from "react-to-print";

export function Birthday() {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("a lovely day");
    const [selectedYear,setSelectedYear] = useState("")
    const [url,setUrl] = useState("https://th.bing.com/th/id/OIP.L1bUoUEuOYDbhgQcomH4RgHaFQ?w=222&h=180&c=7&r=0&o=5&pid=1.7");
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = parseInt(birthday.slice(5, 7));
    const birthYear = parseInt(birthday.slice(0, 4));
    //this still needs to consier date to get an accurate age 
    const earthAge = birthMonth > currentMonth ? currentYear - birthYear - 1 : currentYear - birthYear;
    //A mars year is 1.88 earth years. toFixed() function returns a string, not an integer
    const marsAge = (earthAge / 1.88).toFixed(2);

    const imageRef:any = useRef();

    function handleSubmit(event: any) {
        event.preventDefault();
    }

    const handlePrint = useReactToPrint({
        content: () => imageRef.current,
    })
    return (
        <main>
            <h1 className="birthday-title">Capture the Magic of Your Birthday on Mars:</h1>
            <h2 className="birthday-subtitle">Enter Your Name and Birthday to Receive Your Personalized Martian Photos!</h2>
            <DateNameUserInput setName={setName} setBirthday={setBirthday} handleSubmit={handleSubmit} />

            {/* how to update the useState after submitting a form? */}
            <section className={(earthAge) ? " " : "Mars-Age-hidden"} >
                <article>
                    <p className="MarsAge">Hi {name}, you are {marsAge} Mars years old! </p>
                </article>
            </section>
            <div><BirthdayYearDropdown selectedYear={selectedYear} setSelectedYear={setSelectedYear}/></div>
            <div><ImageViewer src={url}/></div>
            <div><ImageSelector setState={setUrl} date={birthYear<=2012?"2012"+"-"+birthday.slice(5,10):birthday} rover="curiosity" camera="mast"/></div>
            {/* <PdfButton handlePrint={handlePrint} /> */}
            <button className="btn-pdf"><a href={url} download={url} target="_blank">Your birthday card is ready!</a></button>
        </main>
    )
}