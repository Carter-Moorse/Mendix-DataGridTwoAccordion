import { ReactElement, createElement, useEffect, useRef } from "react";

import { useShared } from "src/utils/sharedProps";
import { DataGridTwoAccordionContainerProps } from "typings/DataGridTwoAccordionProps";

interface ObserverProps extends DataGridTwoAccordionContainerProps {
    open: boolean;
    onUpdate: (state: boolean) => void;
    attributeName: string;
}

export function Observer(props: ObserverProps): ReactElement {
    const divRef = useRef<HTMLDivElement>(null);

    const { dataGridCellRef, dataGridRowRef, updateCellRefs } = useShared();

    const dataGridBodyRef = useRef<HTMLElement | null>();
    const dataGridHeaderRef = useRef<HTMLElement | null>();
    const dataGridHeaderColumnRef = useRef<HTMLElement | null>();
    const dataGridHeaderColSelectorRef = useRef<HTMLElement | null>();

    const getDataPosition = (node?: HTMLElement | null): number[] =>
        (node &&
            node
                .getAttribute("data-position")
                ?.split(",")
                .map(v => Number(v))) ||
        [];

    const resetGrid = (node?: HTMLElement | ChildNode | null, all = false): void => {
        if (!node) {
            return;
        }

        (node as HTMLElement).removeAttribute("data-column-span");
        if (all) {
            resetGrid(node.previousSibling as HTMLElement | undefined, true);
        }
    };

    const getState = (): boolean =>
        props.observertype === "trigger"
            ? dataGridRowRef.current?.getAttribute(props.attributeName) === "true"
            : !!dataGridRowRef.current?.classList.contains("tr-selected");

    const toggle = (isOpen: boolean): void => {
        // Update column index, this could change from show/hide columns
        const [columnIndex] = getDataPosition(dataGridCellRef.current);
        if (columnIndex === undefined) {
            throw Error("Could not retrieve column index from 'data-position' attribute");
        }

        dataGridHeaderColumnRef.current = (dataGridHeaderRef.current?.childNodes || [])[columnIndex] as
            | HTMLElement
            | undefined;
        if (!dataGridHeaderColumnRef.current) {
            throw Error("Could not find column header");
        }

        // Remove header
        const dataGridHeaderColumnSibling = dataGridHeaderColumnRef.current!.previousSibling as HTMLElement | undefined;
        dataGridHeaderColumnRef.current!.style.display = "none";
        if (dataGridHeaderColumnSibling) {
            dataGridHeaderColumnSibling!.setAttribute("data-column-span", "2");
        }
        resetGrid(dataGridHeaderColumnSibling?.previousSibling, true);

        const dataGridSibling = dataGridCellRef.current?.previousSibling as HTMLElement | undefined;
        const columnCount = dataGridHeaderRef.current?.childNodes.length || 0;

        if (isOpen) {
            // Open
            dataGridCellRef.current!.style.display = "";
            dataGridCellRef.current!.setAttribute("data-column-span", String(columnCount));
            dataGridCellRef.current!.setAttribute("role", "row");
            if (dataGridHeaderColSelectorRef.current) {
                dataGridHeaderColSelectorRef.current.style.display = "none";
                if (dataGridSibling) {
                    dataGridSibling!.setAttribute("data-column-span", "3");
                }
            } else {
                if (dataGridSibling) {
                    dataGridSibling!.setAttribute("data-column-span", "2");
                }
            }
        } else {
            // Close
            dataGridCellRef.current!.style.display = "none";
            dataGridCellRef.current!.removeAttribute("data-column-span");
            dataGridCellRef.current!.setAttribute("role", "gridcell");
            if (dataGridSibling) {
                dataGridSibling!.setAttribute("data-column-span", "2");
            }
            if (dataGridHeaderColSelectorRef.current) {
                dataGridHeaderColSelectorRef.current.style.display = "";
            }
        }

        resetGrid(dataGridSibling?.previousSibling, true);
    };

    useEffect(() => {
        if (!divRef.current) {
            return;
        }

        updateCellRefs(divRef.current);
        dataGridBodyRef.current = dataGridRowRef.current?.parentElement;
        dataGridHeaderRef.current = dataGridBodyRef.current?.firstChild as HTMLElement | undefined;
        if (
            !dataGridCellRef.current ||
            !dataGridRowRef.current ||
            !dataGridBodyRef.current ||
            !dataGridHeaderRef.current
        ) {
            return;
        }

        dataGridHeaderColSelectorRef.current = dataGridRowRef.current?.querySelector("& > .column-selector") as
            | HTMLElement
            | undefined;

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
        };
    }, [divRef]);

    return (
        <div className={props.class} ref={divRef}>
            {props.open && props.observercontent}
        </div>
    );
}
