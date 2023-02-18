import { useState } from "react";
import { DateNameUserInput } from "./DateNameUserInput";
import ImageViewer from "../marsPhotoViewer/ImageViewer";
import { ImageSelector } from "../marsPhotoViewer/ImageSelector";
import { BirthdayYearDropdown } from "./BirthdayYearDropdown";
import { useRef } from "react";
import './Birthday.scss'
import "./PdfButton.scss";
import PdfButton from "./PdfButton";
import {useReactToPrint} from "react-to-print";

export function Birthday() {
    const [name, setName] = useState("Mars");
    const [birthday, setBirthday] = useState("a lovely day");
    const [nameInput, setNameInput]=useState(name);
    const [birthdayInput, setBirthdayInput]=useState(birthday);
    

    // const [selectedYear,setSelectedYear] = useState("")
    const [url,setUrl] = useState("https://cdn2.penguin.com.au/covers/original/9781524791223.jpg");
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const birthMonth = parseInt(birthday.slice(5, 7));
    const birthYear = parseInt(birthday.slice(0, 4));
    //this still needs to consier date to get an accurate age 
    const earthAge = birthMonth > currentMonth ? currentYear - birthYear - 1 : currentYear - birthYear;
    //A mars year is 1.88 earth years. toFixed() function returns a string, not an integer
    const marsAge = (earthAge / 1.88).toFixed(2);

    const [marsAgeResult, setMarsAgeResult] =useState("2.4 billion");

    const imageRef:any = useRef();

    function handleSubmit(event: any) {
        event.preventDefault();
        setNameInput(name);
        setBirthdayInput(birthday);
        setMarsAgeResult(marsAge)
    }

    const handlePrint = useReactToPrint({
        content: () => imageRef.current,
    })

    return (
        <main>
            <h1 className="birthday-title">Capture the Magic of Your Birthday on Mars:</h1>
            <h2 className="birthday-subtitle">Enter Your Name and Birthday to Receive Your Personalized Martian Photos!</h2>
            <DateNameUserInput setName={setName} setBirthday={setBirthday} handleSubmit={handleSubmit} />
            <p className="MarsAge">Hi {nameInput}, you are {marsAgeResult} Mars years old! </p>

            {/* <div><BirthdayYearDropdown selectedYear={selectedYear} setSelectedYear={setSelectedYear}/></div> */}
            <div><ImageViewer src={url}/></div>
            <div><ImageSelector setState={setUrl} date={birthYear<=2012?"2012"+"-"+birthdayInput.slice(5,10):birthdayInput} rover="curiosity" camera="mast"/></div>
            {/* <PdfButton handlePrint={handlePrint} /> */}
            <button className="btn-pdf"><a href={url} download={url} target="_blank">Your birthday card is ready!</a></button>
        </main>
    )
}