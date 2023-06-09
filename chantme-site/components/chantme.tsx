import React from "react";
import Form from "./form";
import Results from "./results";
import FirstPage from "./firstpage";
import Image from "next/image";
import Loading from "./loading";


const Chantme: React.FC = () => {
    const CHARACTER_LIMIT: number = 32
    const ENDPOINT: string = "https://5vji5umwhd.execute-api.us-east-1.amazonaws.com/prod/generate_chant"
    const [promptFirstTeam, setPromptFirstTeam] = React.useState("");
    const [promptSecondTeam, setPromptSecondTeam] = React.useState("");
    const [chant, setChant] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [firstTimeVisit, setFirstTimeVisit] = React.useState(true);
    const [firstInput, isFirstFilled] = React.useState(false)
    const [secondInput, isSecondFilled] = React.useState(false)

    const onSubmit = () => {
        console.log("Submitting:" + promptFirstTeam, promptSecondTeam)
        setIsLoading(true)
        fetch(`${ENDPOINT}?prompt=${promptFirstTeam},${promptSecondTeam}`)
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
        setPromptSecondTeam("")
    }

    const onStart = () => {
        setFirstTimeVisit(false)
    }

    console.log(chant);

    let displayElement = null;
    
    if (firstTimeVisit) {
        displayElement = <FirstPage onStart={onStart} />
    };
    if (isLoading) {
        displayElement = <Loading />}
    if (hasResult) {
        displayElement = <Results chant={chant} onBack={onReset} promptFirstTeam={promptFirstTeam} promptSecondTeam={promptSecondTeam} />
    } else if (!firstTimeVisit) {
        displayElement = <Form promptFirstTeam={promptFirstTeam} 
                               setPromptFirstTeam={setPromptFirstTeam} 
                               onSubmit={onSubmit} 
                               characterLimit={CHARACTER_LIMIT} 
                               isLoading={isLoading} 
                               promptSecondTeam={promptSecondTeam} 
                               setPromptSecondTeam={setPromptSecondTeam} 
                            />;
    };

    const gradientTextStyle = "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-500 w-fit mx-auto";

    return (
        <div className="h-screen flex">
        <div className="max-w-md m-auto p-2">
            <div className="bg-emerald-900 p-6 rounded-md text-white">
            <div className="text-center my-6">
                <Image src={require("../public/logo.png")} width={102} height={102} alt={"logo"} className="mx-auto rounded-lg"/>
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
