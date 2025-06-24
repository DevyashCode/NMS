import { useSelector } from "react-redux";
import { NetworkListSelector } from "../../Redux/Reducers/NetworkListReducer";

export default function statusCounter(type){
    const data = useSelector(NetworkListSelector);
    let count = 0;
    let workingCount = 0; 
    data.map(e=>{
        if(e.type===type){
            count++;
            if(e.status=="on"){
                workingCount++;  
            }
        }
    })
    return {count,workingCount};
}