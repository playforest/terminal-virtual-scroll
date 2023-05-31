import React, { useEffect } from "react";
import { DataStream } from './helpers/DataStream'
import { useSelector, useDispatch } from 'react-redux';
import { pushData } from './features/datastream/datastreamSlice';
import { RootState } from "./rootState";

export const Terminal = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.datastream.data);

    useEffect(() => {
        console.log('Creating new instance of DataStream and connecting');

        const stream = new DataStream('/dev/ttyUSB0', 100, true, 40, (data) => {
            dispatch(pushData(data))
        })
        stream.connect();
    }, [])

    return (
        <div className="content">
            <div className="prompt">
                {data.map((item, index) => (<div className="line" key={index}> <span style={{ color: '#27c93f' }}>/dev/ttyUSB0$</span> <span>{item}</span></div>))}
            </div>
        </div>
    )
}