
import spinnerImg from '../../assets/img/loading.gif';

import React from 'react'

export default function Spinner() {
    return (
        <div>
            <img src={spinnerImg} alt="loading" className="d-block m-auto" style={{ width: "200px" }} />
            
        </div>
    )
}

