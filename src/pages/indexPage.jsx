import { Outlet } from "react-router-dom";
import '../styles/global.css'
export default function IndexPage(){
    return <div className="pagexBody">
        <Outlet></Outlet>
    </div>
}