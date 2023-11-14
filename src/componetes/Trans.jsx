

export default function Trans(props){
    return(
        <>
        <td className="moditr">{props.children}</td>
        <td><input type="checkbox" className="check" id={props.id} onChange={()=>props.calcular(props.children,props.id)}/></td>
        </>
    )
}