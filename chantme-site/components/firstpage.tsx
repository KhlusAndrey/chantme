interface FirstPageProps {
    onStart: any;
}

const FirstPage: React.FC<FirstPageProps> = (props) => {
    return <>
        <div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2">Here is first page the ChantMe app </div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2"> TODO: About </div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2"> TODO: Add users statment and agreement </div>

           
        </div>

        <button
        className="bg-gradient-to-r from-teal-400 to-green-500 p-2 disabled:opacity-50 w-full rounded-md text-lg mt-6"
        onClick={props.onStart}
         >
            Let&apos;s start
        </button>
    </>
}

export default FirstPage;