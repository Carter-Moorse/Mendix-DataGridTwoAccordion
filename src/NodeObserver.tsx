import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { NodeObserverContainerProps } from "../typings/NodeObserverProps";

import "./ui/NodeObserver.css";

export function NodeObserver({ sampleText }: NodeObserverContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
