import { Fragment, ReactElement, createElement } from "react";
import ClassNames from "classnames";
import { DataGridTwoAccordionPreviewProps } from "../typings/DataGridTwoAccordionProps";
import { Icon } from "mendix/components/web/Icon";
import { getButtonStyle } from "./utils/sharedProps";

export function preview(props: DataGridTwoAccordionPreviewProps): ReactElement {
    if (props.type === "observer") {
        return (
            <props.observercontent.renderer caption="Observer content">
                <div className={props.class}></div>
            </props.observercontent.renderer>
        );
    } else {
        const content = (
            <Fragment>
                {props.triggerdefault === "open" ? (
                    <Icon icon={props.triggericonopen} altText="Opened" />
                ) : (
                    <Icon icon={props.triggericonclosed} altText="Closed" />
                )}
                {" " + props.triggercaption}
            </Fragment>
        );

        if (props.triggertype === "button") {
            return (
                <button
                    type="button"
                    className={ClassNames(
                        "btn",
                        getButtonStyle(props.triggerbuttonstyle),
                        props.triggerdefault === "open" ? props.triggerclassopen : props.triggerclassclosed,
                        props.class
                    )}
                    title={props.triggertooltip}
                >
                    {content}
                </button>
            );
        } else if (props.triggertype === "link") {
            return (
                <a
                    className={ClassNames(
                        "btn",
                        props.triggerdefault === "open" ? props.triggerclassopen : props.triggerclassclosed,
                        props.class
                    )}
                    title={props.triggertooltip}
                >
                    {content}
                </a>
            );
        } else {
            return (
                <props.triggercustom.renderer caption="Trigger content">
                    <div className={props.class}></div>
                </props.triggercustom.renderer>
            );
        }
    }
}

export function getPreviewCss(): string {
    return require("./ui/DataGridTwoAccordion.css");
}
