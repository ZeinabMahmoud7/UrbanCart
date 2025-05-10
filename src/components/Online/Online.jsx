import React from 'react'
import useOnline from '../../Hooks/UseOnline'

const Online = ({children}) => {
    const Isonline=useOnline();
     if(Isonline){
        return children;
     }
}

export default Online