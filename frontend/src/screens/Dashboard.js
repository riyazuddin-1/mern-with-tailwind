import { isSignedIn, getAuthCredentials } from "../utils";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    if(!isSignedIn)
        window.location = '/get-access';

    var userInfo = getAuthCredentials();
    if(typeof(userInfo) == "string"){
        userInfo = JSON.parse(userInfo);
    }
    return ( 
        <>
        <Navbar/>
        <p className="font-bold text-4xl text-center my-12">Welcome! { "Chichaa" }</p>
        </>
     );
}
 
export default Dashboard;