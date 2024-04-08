import { useState } from "react"
import { isSignedIn, setAuthCredentials, showMessage } from "../utils"
import config from "../config.json"

// Login form component
const Login = ({handleSubmit}) => {
    return (
        <form className="space-y-8 min-w-full" name="login" onSubmit={(e) => handleSubmit(e, "login")}>
            <div className="flex flex-col">
                <label className="font-bold" htmlFor="username">Username</label>
                <input id="username" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" placeholder="Unique id" name="username" required/>
            </div>
            <div className="flex flex-col">
                <label className="font-bold" htmlFor="password">Password</label>
                <input id="password" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" placeholder="6+ characters" name="password" required/>
            </div>
            <button className="h-10 px-8 rounded-md bg-slate-600 text-white">Login to Account</button>
        </form>
        )
}

// Registration form component
const Register = ({handleSubmit}) => {
    const [valid, setValidation] = useState(false);

    function isAlphanumeric(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    // Function to verify if the given username is available/exists
    function checkUsername(e) {
        const field = e.currentTarget;
        // Assessing the length the the username provided
        if(field.value.length >= 4) {
            // Check if the username inout follows alphaNumeric pattern
            if(isAlphanumeric(field.value)) {
                // API call th check availability of username
                fetch(config.backend_server + "/auth/check-username", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: field.value })
                })
                .then((response) => {
                    if(response.ok) {
                        setValidation(true);
                        showMessage(`Username '${field.value}' is available`);
                    } else {
                        setValidation(false);
                        showMessage(`Username '${field.value}' is already taken`)
                    }
                })
            } else {
                setValidation(false);
                showMessage("Username can only have alphabet and numbers");
            }
        } else {
            setValidation(false);
            showMessage("Enter atleast 4 characters")
        }
    }
    return (
        <form className="space-y-8" name="register" onSubmit={ (e) => handleSubmit(e, "register")}>
            <div className="flex space-x-2 w-full">
                <div className="flex-1 flex-col">
                    <label className="font-bold" htmlFor="name">Name</label>
                    <input id="name" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" placeholder="Your name" name="name" required/>
                </div>
                <div className="flex-1 flex-col">
                    <label className="font-bold" htmlFor="username">Username</label>
                    <input id="username" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" onInput={checkUsername} minLength={4} placeholder="Unique id" name="username" required/>
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-bold" htmlFor="email">Email</label>
                <input id="email" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" placeholder="example@mail.com" name="mail" required/>
            </div>
            <div className="flex flex-col">
                <label className="font-bold" htmlFor="password">Password</label>
                <input id="password" className="peer h-10 w-full px-3 rounded-md bg-gray-50 outline-none" type="text" placeholder="6+ characters" name="password" required/>
            </div>
            <div className="flex">
                <input type="checkbox" className="text-xl p-0 mt-0 mx-2 h-10 w-10" id="consent" value={true} required/>
                <label className="text-slate-500" htmlFor="consent">Creating an account means you're okay with our Terms of Service, Privacy policy, and our default Notification Settings.</label>
            </div>
            <button className="h-10 px-8 rounded-md bg-slate-600 text-white disabled:bg-slate-300" disabled={ valid ? false : true }>Create Account</button>
        </form>
    )
}

const Access = () => {
    const [valid, setValidation] = useState(false);
    const [authProcess, setAuthProcess] = useState("login");

    if(isSignedIn)
        window.location = "/";

    // Submission form common for both login and registration
    async function handleSubmit(e, formName) {
        e.preventDefault();
        var form = e.currentTarget;
        var submitTo = config.backend_server + '/auth/' + formName;
        console.log(submitTo);
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        const jsonDataString = JSON.stringify(plainFormData);
        var response = await fetch(submitTo, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonDataString
        })
        if(!response.ok) {
            console.log(response);
        } else {
            response.json().then((r)=> {
                setAuthCredentials(r);
                window.location = "/";
            })
        }
    }

    return ( 
        <div className="flex font-sans w-full h-screen fixed">
            <div className=" w-2/5 p-8 relative space-y-8 bg-slate-800 hidden md:flex flex-col">
                <img className="w-24" src="../assets/riyaz-arabic.png"/>
                <p className="text-2xl text-lime-600 font-extrabold">Discover the world's top Designers & Creatives.</p>
                <img className="w-full" src="../assets/sign_up_illustration-nobg.png"/>
            </div>
            <div className="p-4 sm:w-full lg:w-3/5">
                <div className="flex m-auto">
                    {
                        authProcess == "login" ? 
                        <p className="ml-auto">New to the platform? <a href="#" onClick={() => setAuthProcess("register")} className="text-indigo-700 font-semibold">Sign Up</a></p>
                         : 
                        <p className="ml-auto">Already a member? <a href="#" onClick={() => setAuthProcess("login")} className="text-indigo-700 font-semibold">Sign In</a></p>
                    }
                </div>
                <div className="grid place-content-center p-6 space-y-4 w-full max-w-lg h-full m-auto">
                    {
                        authProcess == "login" ? 
                        <>
                        <p className="text-2xl font-extrabold">Sign In to our Haveli</p>
                        <p className={ "text-center " + `${!valid ? "text-red-400" : "text-green-400"}`} id="notify"></p>
                        <Login handleSubmit={handleSubmit}/>
                        </>
                        : 
                        <>
                        <p className="text-2xl font-extrabold">Sign Up to our Haveli</p>
                        <p className={ "text-center " + `${!valid ? "text-red-400" : "text-green-400"}`} id="notify"></p>
                        <Register handleSubmit={handleSubmit}/>
                        </>
                    }
                    <span className="text-sm text-slate-500">This site is protected by reCAPTCHA and teh Google<br/><a className="text-indigo-700 font-semibold" href="https://rizzfolio.web.app/fqeiragnvwebysgrk" target="_about">Privacy Policy</a> and <a className="text-indigo-700 font-semibold" href="https://rizzfolio.web.app/fqeiragnvwebysgrk" target="_about">Terms of Service</a> apply</span>
                </div>
            </div>
        </div>
     );
}
 
export default Access;