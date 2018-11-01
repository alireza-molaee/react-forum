import React from 'react';
import Loader from 'react-loader-spinner'


export default function Loading(props) {
    return (
        <div className="text-center my-5" key={0}><Loader 
            type="Oval"
            color="gray"
            height="50"	
            width="50"
        /></div>
    );
}