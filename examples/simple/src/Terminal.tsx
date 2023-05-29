import React from "react";
import { DataStream } from '../../../helpers/DataStream'
import { useSelector, useDispatch } from 'react-redux';

export const Terminal = () => {
    const dispatch = useDispatch();

    const stream = new DataStream('/dev/ttyUSB0', 1000, true, 1000, (data) => {
        console.log(data);
    })

    return (
        <div className="content">
            <div className="prompt">
                /dev/ttyUSB0$
            </div>
        </div>
    )
}