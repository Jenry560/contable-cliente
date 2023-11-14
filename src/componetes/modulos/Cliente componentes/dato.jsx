import { Link } from "react-router-dom";


export default function Data(props){
    
    return(
        <td className="value"><Link onClick={()=> props.enviox(props.children)}>{props.children}</Link></td>
    )
}