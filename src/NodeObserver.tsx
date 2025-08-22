import { ReactElement, createElement, useRef, useState } from "react";
import { NodeObserverContainerProps } from "../typings/NodeObserverProps";
import "./ui/NodeObserver.css";
import { Observer } from "./components/Observer";

export function NodeObserver({ content, class: className }: NodeObserverContainerProps): ReactElement {
    const [open, setOpen] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    Observer({
        divRef,
        onUpdate: state => setOpen(state),
        observeClassName: "tr-selected"
    })

    return <div className={className} ref={divRef}>{open && content}</div>;
}
