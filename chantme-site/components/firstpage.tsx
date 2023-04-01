interface FirstPageProps {
    onStart: any;
}

const FirstPage: React.FC<FirstPageProps> = (props) => {
    return <>
        <div className="text-slate-100">
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2"
            >Here is first page the ChantMe app 
            </div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2"
            > Hello, this app is for creating chants!
              The rules are simple. 
              You need to enter team names and AI will generate a chant. 
              The first team is your favorite team, 
              the second is who they play against. 
            </div>
            <div className="bg-gradient-to-r from-teal-400 to-green-500 rounded-md my-2 p-2"
            > May occasionally generate incorrect information.
              Ready? Press the button to start!              
            </div>

           
        </div>

        <button
        className="bg-gradient-to-r from-teal-400 to-green-500 p-2 disabled:opacity-50 w-full rounded-md text-lg mt-6 text-green-900 font-semibold" 
        onClick={props.onStart}
         >
            Let&apos;s start
        </button>
    </>
}

export default FirstPage;