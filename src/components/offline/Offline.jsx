import useOnline from "../../Hooks/UseOnline";

const Offline = ({children}) => {
    const Isonline=useOnline();
    if(!Isonline){
       return children;
    }
}

export default Offline
