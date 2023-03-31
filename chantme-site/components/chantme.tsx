import React from "react";
import Form from "./form";
import Results from "./results";
import FirstPage from "./firstpage";
import Image from "next/image";
// import logo from "../public/logo.svg"

const logo = require("../public/logo.svg");


const Chantme: React.FC = () => {
    const CHARACTER_LIMIT: number = 32
    const ENDPOINT: string = "https://5vji5umwhd.execute-api.us-east-1.amazonaws.com/prod/generate_chant"
    const [promptFirstTeam, setPromptFirstTeam] = React.useState("");
    const [promptSecondTeam, setpromptSecondTeam] = React.useState("");
    const [chant, setChant] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [firstTimeVisit, setFirstTimeVisit] = React.useState(true);


    const onSubmit = () => {
        console.log("Submitting:" + promptFirstTeam, promptSecondTeam)
        setIsLoading(true)
        fetch(`${ENDPOINT}?prompt=${promptFirstTeam}%${promptSecondTeam}`)
            .then((res) => res.json())
            .then(onResult)
    };

    const onResult = (data: any) => {
        setChant(data.message)
        setHasResult(true)
        setIsLoading(false)
    };

    const onReset = () => {
        setChant("");
        setHasResult(false)
        setIsLoading(false)
        setPromptFirstTeam("")
        setpromptSecondTeam("")
    }

    const onStart = () => {
        setFirstTimeVisit(false)
    }

    
    console.log(chant);

    let displayElement = null;
    
    if (firstTimeVisit) {
        displayElement = <FirstPage onStart={onStart} />
    };
    
    if (hasResult) {
        displayElement = <Results chant={chant} onBack={onReset} promptFirstTeam={promptFirstTeam} promptSecondTeam={promptSecondTeam} />
    } else if (!firstTimeVisit) {
        displayElement = <Form promptFirstTeam={promptFirstTeam} setPromptFirstTeam={setPromptFirstTeam} onSubmit={onSubmit} characterLimit={CHARACTER_LIMIT} isLoading={isLoading} promptSecondTeam={promptSecondTeam} setpromptSecondTeam={setpromptSecondTeam} />;
    };

    const gradientTextStyle = 
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500 w-fit mx-auto";

    return (
        <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
            <div className="bg-emerald-900 p-6 rounded-md text-white">
            <div className="text-center my-6">
                <Image src={logo} width={82} height={82} alt={"logo"} className="mx-auto rounded-lg"/>
            <h1 className={gradientTextStyle + " text-4xl font-ligth"}>ChantMe</h1>  
            <div className={gradientTextStyle}>
            Your AI chant assistent.
          </div>
            </div>          
            {displayElement}
        </div>
        </div>   
            
        </div>

    );
};



export default Chantme;
