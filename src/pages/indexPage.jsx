import { Outlet } from "react-router-dom";
import '../styles/global.css'
export default function IndexPage(){
    return <div className="pageBody">
      <div className="content"> <Outlet></Outlet></div>
    </div>
}