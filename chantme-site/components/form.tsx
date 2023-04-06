interface FormProps {
    promptFirstTeam: string;
    setPromptFirstTeam: any;
    promptSecondTeam: string;
    setPromptSecondTeam: any;
    onSubmit: any;
    characterLimit: number;
    isLoading: boolean;    
}

const Form: React.FC<FormProps> = (props) => {
    const isPromptVlidFirst = props.promptFirstTeam.length < props.characterLimit
    const isPromptVlidSecond = props.promptSecondTeam.length < props.characterLimit
    
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPromptFirstTeam(text)
        };
    };
    const updatePromptValueSecond = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPromptSecondTeam(text)
        };
    };
    
    const InputStyle = "p-2 w-full rounded-md focus:outline-teal-500 focus:outline text-slate-800";

    let statusColorFirst = "text-slate-400 text-sm" 
    let statusColorSecond  = "text-slate-400 text-sm";
    let statusTextFirst = null;
    let statusTextSecond = null;
    if (!isPromptVlidFirst) {
        statusColorFirst = "text-red-500 text-sm";
        statusTextFirst = `Input must be less than${props.characterLimit} characters`
    };
    if (!isPromptVlidSecond) {
        statusColorSecond = "text-red-500 text-sm";
        statusTextSecond = `Input must be less than${props.characterLimit} characters`
    };


    return <>
        <p className="mb-6 text-slate-300 ">
        Tell me which team to generate the chant for and which team is it playing against?
        </p>
        <input
            className={InputStyle}
            type="text"
            placeholder="FC Real Madrid"
            value={props.promptFirstTeam}
            onChange={(e) => updatePromptValue(e.currentTarget.value)}
            required
        ></input>

            <div className= {statusColorFirst + " flex justify-between mb-2"}>
                <div>{statusTextFirst}</div>
                <div>
                    {props.promptFirstTeam.length}/{props.characterLimit}
                </div>                
            </div>
            
        <div className="flex justify-center mt-1 mb-4">
            <p className="text-slate-300 text-xl text-justify">VS</p>
        </div>
        
        <input 
            className={InputStyle}
            type="text" 
            placeholder="FC Barcelona"
            value={props.promptSecondTeam}
            onChange={(e) => updatePromptValueSecond(e.currentTarget.value)}
            required
        ></input>
        
        <div className= {statusColorSecond + " flex justify-between mt-2 mb-6"}>
                <div>{statusTextSecond}</div>
                <div>
                    {props.promptSecondTeam.length}/{props.characterLimit}
                </div>
        </div>
        
        <button 
        className="bg-gradient-to-r from-teal-400 to-green-500 p-2 disabled:opacity-50 w-full rounded-md text-lg"
        onClick={props.onSubmit} 
        disabled={!isPromptVlidFirst || props.isLoading }
        >
            Generate Chant
        </button>
        
    </>
}

export default Form;