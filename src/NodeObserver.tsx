import { ReactElement, createElement, useRef, useState } from "react";
import { NodeObserverContainerProps } from "../typings/NodeObserverProps";
import "./ui/NodeObserver.css";
import { Observer } from "./components/Observer";
import { Icon } from "mendix/components/web/Icon";

export function NodeObserver(props: NodeObserverContainerProps): ReactElement {
    const [open, setOpen] = useState(props.triggerdefault === "open");

    const divRef = useRef<HTMLDivElement>(null);

    if (props.type === "observer") {
        Observer({
            divRef,
            onUpdate: state => setOpen(state),
            observeClassName: props.sharedclass
        });

        return <div className={props.class} ref={divRef}>{open && props.observercontent}</div>;
    }
    else {
        const content = (open ? 
                <Icon icon={props.triggericonopen?.value} altText="Opened" /> :
                <Icon icon={props.triggericonclosed?.value} altText="Closed" />)
                +  " "
                + props.triggercaption;
        
        if (props.triggertype === "button") {
            return <button 
                className={open ? props.triggerclassopen.value : props.triggerclassclosed.value} 
                type="button" 
                title={props.triggertooltip?.value} 
                onClick={() => setOpen(!open)}
            >
                {content}
            </button>
        }
        else if (props.triggertype === "link") {
            return <link 
                className={open ? props.triggerclassopen.value : props.triggerclassclosed.value} 
                title={props.triggertooltip?.value} 
                onClick={() => setOpen(!open)}
            >
                {content}
            </link>
        }
        else {
            return <div 
                className={open ? props.triggerclassopen.value : props.triggerclassclosed.value} 
                title={props.triggertooltip?.value} 
                onClick={() => setOpen(!open)}
            >
                {props.triggercustom}
            </div>
        }

    }

}
