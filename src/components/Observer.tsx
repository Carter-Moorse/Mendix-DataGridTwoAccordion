import { ReactElement, createElement, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ClassNames from "classnames";

import { useShared } from "src/utils/sharedProps";
import { DataGridTwoAccordionContainerProps } from "typings/DataGridTwoAccordionProps";

interface ObserverProps extends DataGridTwoAccordionContainerProps {
    open: boolean;
    onUpdate: (state: boolean) => void;
    attributename: string;
}

export function Observer(props: ObserverProps): ReactElement {
    const divRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement | null>();
    const colRef = useRef<HTMLDivElement | null>();

    const { dataGridCellRef, dataGridRowRef, updateCellRefs } = useShared();

    const dataGridBodyRef = useRef<HTMLElement | null>();
    const dataGridHeaderRef = useRef<HTMLElement | null>();

    const createRow = (span: number) => {
        // Create new row
        const row = rowRef.current || document.createElement("div");
        const rowClass = props.observerrowclassopen.value;
        row.setAttribute("class", ClassNames("tr", rowClass));
        row.setAttribute("role", "row");
        // ... set selected if selected
        if (props.observertype === "onselect") {
            props.observerselectedclass && row.classList.add("tr-selected");
            row.setAttribute("aria-selected", "true");
        }
        // Create new column in new row
        const col = colRef.current || document.createElement("div");
        const colClass = props.observercolclassopen.value;
        col.setAttribute("class", ClassNames("td", colClass));
        col.setAttribute("role", "gridcell");
        col.setAttribute("tabindex", "-1");
        // ... set span to full width
        col.style.gridColumnStart = `span ${span}`
        row.appendChild(col);
        dataGridRowRef.current!.after(row);
        
        rowRef.current = row;
        colRef.current = col;
    }

    const getState = (): boolean =>
        props.observertype === "trigger"
            ? dataGridRowRef.current?.getAttribute(props.attributename) === "true"
            : !!dataGridRowRef.current?.classList.contains("tr-selected");

    const toggle = (isOpen: boolean): void => {
        const columnCount = dataGridHeaderRef.current?.childNodes.length || 0;

        if (isOpen) {
            // Open
            createRow(columnCount);
        }
        else {
            rowRef.current?.remove();
            rowRef.current = null;
            colRef.current = null;
        }
    };

    useEffect(() => {
        if (!divRef.current) {
            return;
        }

        updateCellRefs(divRef.current);
        // Data grid 2 body
        dataGridBodyRef.current = dataGridRowRef.current?.parentElement;
        // Data grid 2 header
        dataGridHeaderRef.current = dataGridBodyRef.current?.parentElement?.firstChild?.firstChild as
            | HTMLElement
            | undefined;
        if (
            !dataGridCellRef.current ||
            !dataGridRowRef.current ||
            !dataGridBodyRef.current ||
            !dataGridHeaderRef.current
        ) {
            return;
        }

        // Inital state
        const state = getState();
        toggle(state);
        props.onUpdate(state);

        const callback: MutationCallback = () => {
            const state = getState();
            toggle(state);
            props.onUpdate(state);
        };

        const observer = new MutationObserver(callback);
        observer.observe(dataGridRowRef.current, { attributes: true, childList: true, subtree: false });

        return () => {
            observer.disconnect();
            rowRef.current?.remove();
        };
    }, [divRef]);

    return (
        <div className={props.class} ref={divRef}>
            {props.open && colRef.current && createPortal(
                props.observercontent,
                colRef.current
            )}
        </div>
    );
}
