import { ReactElement, createElement, useEffect, useRef, useState } from "react";
import { NodeObserverContainerProps } from "../typings/NodeObserverProps";
import "./ui/NodeObserver.css";

export function NodeObserver({ content, class: className }: NodeObserverContainerProps): ReactElement {
    const [selected, setSelected] = useState(false);
    const thisRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!thisRef) return;

        const dataGridCell = thisRef.current?.parentElement?.parentElement
        const dataGridRow = dataGridCell?.parentElement;
        const dataGridBody = dataGridRow?.parentElement;
        if (!dataGridCell || !dataGridRow || !dataGridBody) return;

        const columnId = dataGridCell.getAttribute("data-position")?.split(",")[0];
        if (!columnId) return;

        const dataGridHeaderCell = dataGridBody.querySelector(`.tr > div.th[data-column-id=\"${columnId}\"]`) as HTMLElement | undefined;
        if (!dataGridHeaderCell) return;
        
        // Hide header
        dataGridHeaderCell.classList.add("tr-hidden");
        dataGridHeaderCell.style.gridColumnStart = `span ${Number(columnId || 0) + 1}`;
        // Hide cell
        dataGridCell.classList.add("tr-hidden");
        dataGridCell.style.gridColumnStart = `span ${Number(columnId || 0) + 1}`;

        // Callback function to execute when mutations are observed
        const callback: MutationCallback = (mutationList) => {
            let isSelected = false;

            for (const mutation of mutationList) {
                if (mutation.type === "attributes" && mutation.attributeName?.includes("class")) {
                    isSelected = (mutation.target as HTMLElement).classList.contains("tr-selected");
                    setSelected(isSelected);
                    break;
                }
            }

            isSelected ? dataGridCell.classList.remove("tr-hidden") : dataGridCell.classList.add("tr-hidden");
        };
        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        // Start observing the target node for configured mutations
        observer.observe(dataGridRow, { attributes: true, childList: false, subtree: false });
        // Disconnect observer on teardown
        return () => { observer.disconnect(); };
    }, [thisRef]);

    return <div className={className} ref={thisRef}>{ selected && content }</div>;
}
