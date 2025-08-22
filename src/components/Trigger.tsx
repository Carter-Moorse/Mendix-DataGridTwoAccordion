import { ReactElement, createElement, useEffect, useRef, Fragment } from "react";
import { Icon } from "mendix/components/web/Icon";
import ClassNames from "classnames"
import { NodeObserverContainerProps } from "typings/NodeObserverProps";

interface TriggerProps extends NodeObserverContainerProps {
    open: boolean,
    onClick: (state: boolean) => void,
}

export function Trigger(props: TriggerProps): ReactElement {
    const divRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const dataGridCellRef = useRef<HTMLElement | null>();
    const dataGridRowRef = useRef<HTMLElement | null>();

    useEffect(() => {
        const ele = divRef.current || buttonRef.current || linkRef.current;

        if (!ele) return;

        dataGridCellRef.current = ele.parentElement?.parentElement;
        dataGridRowRef.current = dataGridCellRef.current?.parentElement;
    }, [divRef, buttonRef, linkRef]);

    const toggle = () => {
        if (props.open) {
            dataGridRowRef.current?.classList.remove(props.sharedclass);
        }
        else {
            dataGridRowRef.current?.classList.add(props.sharedclass);
        }
        props.onClick(!props.open);
    }

    const content = <Fragment>
            {(props.open ? 
                <Icon icon={props.triggericonopen?.value} altText="Opened" /> :
                <Icon icon={props.triggericonclosed?.value} altText="Closed" />
            )}
            {" " + props.triggercaption?.value}
        </Fragment>;
        
    if (props.triggertype === "button") {
        return <button 
            ref={buttonRef}
            className={ClassNames(
                "btn",
                props.open ? props.triggerclassopen.value : props.triggerclassclosed.value
            )} 
            type="button" 
            title={props.triggertooltip?.value} 
            onClick={toggle}
        >
            {content}
        </button>
    }
    else if (props.triggertype === "link") {
        return <a 
            ref={linkRef}
            className={props.open ? props.triggerclassopen.value : props.triggerclassclosed.value} 
            title={props.triggertooltip?.value} 
            onClick={toggle}
        >
            {content}
        </a>
    }
    else {
        return <div 
            ref={divRef}
            className={props.open ? props.triggerclassopen.value : props.triggerclassclosed.value} 
            title={props.triggertooltip?.value} 
            onClick={toggle}
        >
            {props.triggercustom}
        </div>
    }
}