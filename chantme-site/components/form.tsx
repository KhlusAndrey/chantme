interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    characterLimit: number;
    isLoading: boolean;
}

const Form: React.FC<FormProps> = (props) => {
    const isPromptVlid = props.prompt.length <= props.characterLimit
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text)
        }
    };
    return <>
    <p>
            Tell me for which commands to generate chants?
        </p>
        <input 
            type="text" 
            placeholder="FC Real Madrid"
            value={props.prompt}
            onChange={(e) => updatePromptValue(e.currentTarget.value)}
        ></input> 
        <input type="text" placeholder="FC Barcelona"></input> 
        <div>
            {props.prompt.length}/{props.characterLimit}
        </div>
        <button onClick={props.onSubmit} disabled={!isPromptVlid || props.isLoading}>Generate Chant</button>

    </>
}

export default Form;