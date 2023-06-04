import React, { useEffect, useRef, RefObject, useCallback, useState } from "react";
import { DataStream } from './helpers/DataStream'
import { useSelector, useDispatch } from 'react-redux';
import { pushData } from './features/datastream/datastreamSlice';
import { RootState } from "./rootState";
import { VirtualConsole } from "./virtualconsole/VirtualConsole";

export const Terminal = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.datastream.data);
    const [scrollPosition, setScrollPosition] = useState(0);

    const contentRef: RefObject<HTMLDivElement> = useRef(null);
    // const lineRef: RefObject<HTMLDivElement> = useRef(null);
    const leadingDivPlaceholderRef: RefObject<HTMLDivElement> = useRef(null);

    let lineRef: HTMLDivElement | null = null;
    let virtualconsole = useRef<VirtualConsole | null>(null);

    const setLineRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            lineRef = node;
            if (virtualconsole.current === null) {
                virtualconsole.current = new VirtualConsole({
                    _totalLines: data,
                    _currentScrollPosition: contentRef.current?.scrollTop ?? 0,
                    _viewableAreaHeight: contentRef.current?.clientHeight ?? 0,
                    _lineHeight: lineRef.clientHeight,
                    _buffer: 5
                });
            }
        }
    }, [data, contentRef]);

    let leadingPlaceholderHeight = 0;

    useEffect(() => {
        const scrollHandler = (event: any) => {
            // Update the virtualconsole properties on each scroll
            if (virtualconsole.current) {
                let scrollPos = contentRef.current?.scrollTop;
                setScrollPosition(scrollPos ?? 0);
                // virtualconsole.current.totalLines = data;

                console.log('scrollTop pos: ', virtualconsole.current.currentScrollPosition)
                virtualconsole.current.currentScrollPosition = scrollPos ?? 0;
                // virtualconsole.current.currentScrollPosition = scrollPos ?? 0;

                virtualconsole.current.updateLeadingPlaceholderHeight();

                const leadingPlaceholderHeight = virtualconsole.current.leadingPlaceholderHeight;
                console.log('leadingPlaceholderHeight: ', leadingPlaceholderHeight)
                console.log('firstVIsibleElementIndex: ', virtualconsole.current.firstRenderedElementIndex())
                leadingDivPlaceholderRef.current?.style.setProperty('height', `${leadingPlaceholderHeight}px`);
            }
        }

        const el = contentRef.current;
        if (el) {
            el.addEventListener("scroll", scrollHandler, { passive: true });
            return () => el.removeEventListener("scroll", scrollHandler);
        }
    }, []);


    useEffect(() => {
        console.log('Creating new instance of DataStream and connecting');

        const stream = new DataStream({
            name: '/dev/ttyUSB0',
            updateFrequency: 100,
            isActive: true,
            immediate: true,
            dataLength: 40,
            onDataReceived: (data) => {
                dispatch(pushData(data))
            }
        })
        stream.connect();

    }, [])

    return (
        <div
            className="content" ref={contentRef}>
            <div
                className="prompt">
                <div
                    className="leading-placeholder"
                    ref={leadingDivPlaceholderRef}
                >
                </div>
                {data.slice(virtualconsole.current?.firstRenderedElementIndex() ?? 0)
                    .map((item, index) => (
                        <div className="line" key={`${item}-${index}`} ref={setLineRef}>
                            <span style={{ color: '#27c93f', lineHeight: '14px' }}>/dev/ttyUSB0$</span>
                            <span>{item}</span>
                        </div>
                    ))
                }
                <div
                    className="trailing-placeholder"
                    style={{ height: '0px' }}>
                </div>
            </div>
        </div>
    )
}