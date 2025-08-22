import { ReactElement, createElement, useEffect, useRef } from "react";
import { NodeObserverContainerProps } from "typings/NodeObserverProps";

interface ObserverProps extends NodeObserverContainerProps {
    open: boolean,
    onUpdate: (state: boolean) => void,
}

export function Observer(props: ObserverProps): ReactElement {
    const divRef = useRef<HTMLDivElement>(null);

    const dataGridCellRef = useRef<HTMLElement | null>();
    const dataGridRowRef = useRef<HTMLElement | null>();
    const dataGridBodyRef = useRef<HTMLElement | null>();
    const dataGridHeaderRef = useRef<HTMLElement | null>();
    const dataGridHeaderColumnRef = useRef<HTMLElement | null>();
    const dataGridHeaderColSelectorRef = useRef<HTMLElement | null>();

    const getDataPosition = (node?: HTMLElement | null) => (node && node.getAttribute("data-position")?.split(",").map(v => Number(v))) || []
    
    const resetAll = () => {
        dataGridRowRef.current?.childNodes.forEach(col => resetGrid(col));
        dataGridHeaderRef.current?.childNodes.forEach(col => resetGrid(col));
        if (dataGridHeaderColSelectorRef.current) dataGridHeaderColSelectorRef.current.style.display = "";
    }

    const resetGrid = (node?: HTMLElement | ChildNode | null, all: boolean = false) => {
        if (!node) return;

        (node as HTMLElement).style.gridColumnStart = "";
        all && resetGrid(node.previousSibling as HTMLElement | undefined, true);
    }

    const getState = () => !!dataGridRowRef.current?.classList.contains(props.sharedclass);

    const toggle = (isOpen: boolean) => {
        // Update column index, this could change from show/hide columns
        const [columnIndex] = getDataPosition(dataGridCellRef.current);
        if (columnIndex == undefined) throw Error("Could not retrieve column index from 'data-position' attribute");

        dataGridHeaderColumnRef.current = (dataGridHeaderRef.current?.childNodes || [])[columnIndex] as HTMLElement | undefined;
        if (!dataGridHeaderColumnRef.current) throw Error("Could not find column header");

        // Remove header
        const dataGridHeaderColumnSibling = dataGridHeaderColumnRef.current!.previousSibling as HTMLElement | undefined;
        dataGridHeaderColumnRef.current!.style.display = "none";
        if (dataGridHeaderColumnSibling) dataGridHeaderColumnSibling.style.gridColumnStart = "span 2";
        resetGrid(dataGridHeaderColumnSibling?.previousSibling, true);

        
        const dataGridSibling = dataGridCellRef.current?.previousSibling as HTMLElement | undefined;
        const columnCount = dataGridHeaderRef.current?.childNodes.length || 0;

        if (isOpen) {
            // Open
            dataGridCellRef.current!.style.display = "";
            dataGridCellRef.current!.style.gridColumnStart = `span ${columnCount}`;
            dataGridCellRef.current!.setAttribute("role", "row");
            if (dataGridHeaderColSelectorRef.current) {
                dataGridHeaderColSelectorRef.current.style.display = "none";
                if (dataGridSibling) dataGridSibling!.style.gridColumnStart = "span 3";
            }
            else {
                if (dataGridSibling) dataGridSibling!.style.gridColumnStart = "span 2";
            }
        }
        else {
            // Close
            dataGridCellRef.current!.style.display = "none";
            dataGridCellRef.current!.style.gridColumnStart = "";
            dataGridCellRef.current!.setAttribute("role", "gridcell");
            if (dataGridSibling) dataGridSibling!.style.gridColumnStart = "span 2";
            if (dataGridHeaderColSelectorRef.current) {
                dataGridHeaderColSelectorRef.current.style.display = "";
            }
        }

        resetGrid(dataGridSibling?.previousSibling, true);
    }

    useEffect(() => {
        if (!divRef.current) return;

        dataGridCellRef.current = divRef.current.parentElement?.parentElement;
        dataGridRowRef.current = dataGridCellRef.current?.parentElement;
        dataGridBodyRef.current = dataGridRowRef.current?.parentElement;
        dataGridHeaderRef.current = dataGridBodyRef.current?.firstChild as HTMLElement | undefined;
        if (!dataGridCellRef.current || !dataGridRowRef.current || !dataGridBodyRef.current || !dataGridHeaderRef.current) return;
        
        dataGridHeaderColSelectorRef.current = dataGridRowRef.current?.querySelector("& > .column-selector") as HTMLElement | undefined;

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
            resetAll();
        };
    }, [divRef]);

    return <div className={props.class} ref={divRef}>{props.open && props.observercontent}</div>;
}