import { ReactElement, createElement, useState } from "react";
import { DataGridTwoAccordionContainerProps } from "../typings/DataGridTwoAccordionProps";
import { Observer } from "./components/Observer";
import { Trigger } from "./components/Trigger";
import "./ui/DataGridTwoAccordion.css";

export function DataGridTwoAccordion(props: DataGridTwoAccordionContainerProps): ReactElement {
    const [open, setOpen] = useState(props.triggeropendefault.value ?? false);

    if (props.type === "observer") {
        return (
            <Observer open={open} onUpdate={state => setOpen(state)} {...props} />
        );
    } else {
        return <Trigger open={open} onClick={state => setOpen(state)} {...props} />;
    }
}
