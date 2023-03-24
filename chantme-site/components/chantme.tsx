import React from "react";
import Form from "./form";
import Results from "./results";


const Chantme: React.FC = () => {
    const CHARACTER_LIMIT: number = 32
    const ENDPOINT: string = "https://5vji5umwhd.execute-api.us-east-1.amazonaws.com/prod/generate_chant"
    const [prompt, setPrompt] = React.useState("");
    const [chant, setChant] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)


    const onSubmit = () => {
        console.log("Submitting:" + prompt)
        setIsLoading(true)
        fetch(`${ENDPOINT}?prompt=${prompt}`)
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
    }

    console.log(chant);

    let displayElement = null;


    if (hasResult) {
        displayElement = <Results chant={chant} onBack={onReset} prompt={prompt} />
    } else {
        displayElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} characterLimit={CHARACTER_LIMIT} isLoading={isLoading} />;
    };


    return (
        <>
            <h1>ChantMe</h1>
            {displayElement}
        </>

    );
};



export default Chantme;
