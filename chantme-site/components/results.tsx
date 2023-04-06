interface ResultsProps {
    chant: string;
    onBack: any;
    promptFirstTeam: string;
    promptSecondTeam: string;
}

const Results: React.FC<ResultsProps> = (props) => {
    const lines = props.chant.split('\n');

    return <>
        <div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2">Here is chant for your team {props.promptFirstTeam} playing against {props.promptSecondTeam}:</div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2">
                {lines.map((line, index) => (
                    <p key={index} className="mb-2">
                    {line}
                    </p>
                ))}
            </div>
        </div>

        <button
        className="bg-gradient-to-r from-teal-400 to-green-500 p-2 disabled:opacity-50 w-full rounded-md text-lg mt-6  text-green-900 "
        onClick={props.onBack}
         >
            Back
        </button>
    </>
}

export default Results;