interface FormProps {
    promptFirstTeam: string;
    setPromptFirstTeam: any;
    promptSecondTeam: string;
    setpromptSecondTeam: any;
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
            props.setpromptSecondTeam(text)
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

    if (!props.isLoading) {
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-3xl mr-4">Loading</span>
          {/* <!-- loading icon --> */}
          <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {/* <!-- end loading icon --> */}
        </div>
      </div>
    }

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
        disabled={!isPromptVlidFirst || props.isLoading}
        >
            Generate Chant
        </button>

        
    </>
}

export default Form;