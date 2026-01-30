import { ReactElement, createElement, useEffect, useRef, Fragment } from "react";
import ClassNames from "classnames";

import { useShared, getButtonStyle } from "src/utils/sharedProps";
import { Icon } from "mendix/components/web/Icon";
import { DataGridTwoAccordionContainerProps } from "typings/DataGridTwoAccordionProps";

interface TriggerProps extends DataGridTwoAccordionContainerProps {
    open: boolean;
    onClick: (state: boolean) => void;
    attributename: string;
}

export function Trigger(props: TriggerProps): ReactElement {
    const divRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    const { dataGridRowRef, updateCellRefs } = useShared();

    useEffect(() => {
        const ele = divRef.current || buttonRef.current || linkRef.current;

        if (!ele) {
            return;
        }
        updateCellRefs(divRef.current || buttonRef.current || linkRef.current);

        const state = props.open || getState();
        toggle(state);
    }, [divRef, buttonRef, linkRef]);

    const getState = (): boolean => dataGridRowRef.current?.getAttribute(props.attributename) === "true";

    const toggle = (isOpen: boolean): void => {
        dataGridRowRef.current?.setAttribute(props.attributename, isOpen ? "true" : "false");
        props.onClick(isOpen);
    };

    const delayToggle = (isOpen: boolean, delay = 200): NodeJS.Timeout => setTimeout(() => toggle(isOpen), delay);

    const content = (
        <Fragment>
            {props.open ? (
                <Icon icon={props.triggericonopen?.value} altText="Opened" />
            ) : (
                <Icon icon={props.triggericonclosed?.value} altText="Closed" />
            )}
            {" " + props.triggercaption?.value}
        </Fragment>
    );

    if (props.triggertype === "button") {
        return (
            <button
                ref={buttonRef}
                className={ClassNames(
                    "btn",
                    getButtonStyle(props.triggerbuttonstyle),
                    props.open ? props.triggerclassopen.value : props.triggerclassclosed.value,
                    props.class
                )}
                type="button"
                title={props.triggertooltip?.value}
                onClick={() => delayToggle(!props.open, props.triggerdelay)}
            >
                {content}
            </button>
        );
    } else if (props.triggertype === "link") {
        return (
            <a
                ref={linkRef}
                className={ClassNames(
                    props.open ? props.triggerclassopen.value : props.triggerclassclosed.value,
                    props.class
                )}
                title={props.triggertooltip?.value}
                onClick={() => delayToggle(!props.open, props.triggerdelay)}
            >
                {content}
            </a>
        );
    } else {
        return (
            <div
                ref={divRef}
                className={ClassNames(
                    props.open ? props.triggerclassopen.value : props.triggerclassclosed.value,
                    props.class
                )}
                title={props.triggertooltip?.value}
                onClick={() => delayToggle(!props.open, props.triggerdelay)}
            >
                {props.triggercustom}
            </div>
        );
    }
}
