import { useLoader } from "../../contexts/loaderContext"

export default function Loader(){
    const [loading , setLoading] = useLoader();
    return loading?<div className="loader-holder">
        <div className="loader"></div>
    </div>:null ;
}