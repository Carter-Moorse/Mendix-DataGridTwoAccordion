import { useRef } from "react";
import { TriggerbuttonstyleEnum } from "typings/DataGridTwoAccordionProps";

const findDataGridCell = (ele: HTMLElement | null | undefined): HTMLElement | null => {
    if (!ele) {
        return null;
    }

    // Cell?
    if (ele.classList.contains("td") && ele.getAttribute("role") === "gridcell") {
        return ele;
    } else {
        return findDataGridCell(ele.parentElement);
    }
};

export function getButtonStyle(buttonStyle: TriggerbuttonstyleEnum): string | undefined {
    switch (buttonStyle) {
        case "danger":
            return "btn-danger";
        case "info":
            return "btn-info";
        case "inverse":
            return "btn-inverse";
        case "primary":
            return "btn-primary";
        case "success":
            return "btn-success";
        case "warning":
            return "btn-warning";
    }

    return undefined;
}

export function useShared() {
    const dataGridCellRef = useRef<HTMLElement | null>();
    const dataGridRowRef = useRef<HTMLElement | null>();

    const updateCellRefs = (wrapper: HTMLElement | null | undefined) => {
        dataGridCellRef.current = findDataGridCell(wrapper);
        dataGridRowRef.current = dataGridCellRef.current?.parentElement;
    };

    return {
        dataGridCellRef,
        dataGridRowRef,
        updateCellRefs
    };
}
