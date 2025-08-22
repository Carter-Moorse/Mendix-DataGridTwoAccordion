import { ReactElement, createElement, useState } from "react";
import { NodeObserverContainerProps } from "../typings/NodeObserverProps";
import "./ui/NodeObserver.css";
import { Observer } from "./components/Observer";
import { Trigger } from "./components/Trigger";


export function NodeObserver(props: NodeObserverContainerProps): ReactElement {
    const [open, setOpen] = useState(props.triggerdefault === "open");

    if (props.type === "observer") {
        return <Observer
            open={open}
            onUpdate={state => setOpen(state)}
            {...props}
        />
        
    }
    else {
        return <Trigger
            open={open}
            onClick={state => setOpen(state)}
            {...props}
        />
    }

}
