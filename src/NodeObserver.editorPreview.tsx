import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { NodeObserverPreviewProps } from "../typings/NodeObserverProps";

export function preview({ sampleText }: NodeObserverPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/NodeObserver.css");
}
