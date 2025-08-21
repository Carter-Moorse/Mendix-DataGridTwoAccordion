import { Fragment, ReactElement, createElement } from "react";
// import { NodeObserverPreviewProps } from "../typings/NodeObserverProps";

export function preview(): ReactElement { //{ content }: NodeObserverPreviewProps
    return <Fragment>{ "Contents" }</Fragment>;
}

export function getPreviewCss(): string {
    return require("./ui/NodeObserver.css");
}
