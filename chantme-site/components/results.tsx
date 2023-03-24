interface ResultsProps {
    chant: string;
    onBack: any;
    prompt: string;
}

const Results: React.FC<ResultsProps> = (props) => {
    return <>
        <div>
            <div><b>Here is chant for your team {props.prompt}:</b></div>
            <div>{props.chant}</div>
        </div>
        <button onClick={props.onBack}>Back</button>
    </>
}

export default Results;