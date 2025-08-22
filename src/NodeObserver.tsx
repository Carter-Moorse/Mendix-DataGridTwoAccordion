import { ReactElement, createElement, useEffect, useRef, useState } from "react";
import { NodeObserverContainerProps } from "../typings/NodeObserverProps";
import "./ui/NodeObserver.css";

const TEMPNODECLASS = "td-temporary";
const HIDDENROWCLASS = "tr-hidden";

export function NodeObserver({ content, class: className }: NodeObserverContainerProps): ReactElement {
    const [selected, setSelected] = useState(false);
    const thisRef = useRef<HTMLDivElement>(null);

    const getDataPosition = (node: HTMLElement) => node.getAttribute("data-position")?.split(",").map(v => Number(v)) || []

    const removeTempNodes = (searchNode?: HTMLElement) => {
        if (!searchNode) return;

        searchNode.querySelectorAll(`.${TEMPNODECLASS}`).forEach(node => node.remove());
    }

    const insertTempNode = (beforeNode: HTMLElement) => {
        const newNode = document.createElement("div");
        newNode.classList.add("td", HIDDENROWCLASS, TEMPNODECLASS);
        newNode.setAttribute("tabindex", "-1");

        beforeNode.parentElement?.insertBefore(newNode, beforeNode);
        return newNode;
    }

    useEffect(() => {
        if (!thisRef) return;

        const dataGridCell = thisRef.current?.parentElement?.parentElement
        const dataGridRow = dataGridCell?.parentElement;
        const dataGridBody = dataGridRow?.parentElement;
        if (!dataGridCell || !dataGridRow || !dataGridBody) return;

        const [columnIndex] = getDataPosition(dataGridCell);
        if (columnIndex == undefined) return;

        const dataGridHeaderColumns = dataGridBody.querySelector(".tr")?.childNodes as NodeListOf<HTMLElement> | undefined;
        const dataGridHeaderColumn = (dataGridHeaderColumns || [])[columnIndex] as HTMLElement | undefined;
        if (!dataGridHeaderColumn) return;
        
        // Hide header
        dataGridHeaderColumn.classList.add(HIDDENROWCLASS);
        // Hide cell
        dataGridCell.classList.add(HIDDENROWCLASS);
        
        // Callback function to execute when mutations are observed
        const callback: MutationCallback = (mutationList) => {
            let isSelected = selected;
            
            for (const mutation of mutationList) {
                if (mutation.type === "attributes" && mutation.attributeName?.includes("class")) {
                    isSelected = (mutation.target as HTMLElement).classList.contains("tr-selected");
                    setSelected(isSelected);
                    break;
                }
            }

            const columnCount = dataGridHeaderColumns?.length || 0;
            const [, rowIndex] = getDataPosition(dataGridCell);
            
            if (isSelected) {
                dataGridCell.classList.remove(HIDDENROWCLASS);
                dataGridCell.style.gridColumnStart = `span ${columnCount}`;
                dataGridCell.style.gridRow = `${rowIndex + 3}`
                dataGridCell.setAttribute("role", "row");
                removeTempNodes(dataGridRow);
                insertTempNode(dataGridCell);
            }
            else {
                dataGridCell.classList.add(HIDDENROWCLASS);
                dataGridCell.style.gridColumnStart = "";
                dataGridCell.style.gridRow = "";
                dataGridCell.setAttribute("role", "gridcell");
                removeTempNodes(dataGridRow);
            } 
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
