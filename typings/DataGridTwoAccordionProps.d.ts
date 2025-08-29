/**
 * This file was generated from DataGridTwoAccordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, WebIcon } from "mendix";

export type TypeEnum = "observer" | "trigger";

export type ObservertypeEnum = "trigger" | "onselect";

export type TriggertypeEnum = "button" | "link" | "custom";

export type TriggerbuttonstyleEnum = "default" | "inverse" | "primary" | "info" | "success" | "warning" | "danger";

export type TriggerdefaultEnum = "closed" | "open";

export interface DataGridTwoAccordionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    type: TypeEnum;
    observertype: ObservertypeEnum;
    observercontent?: ReactNode;
    triggertype: TriggertypeEnum;
    triggerbuttonstyle: TriggerbuttonstyleEnum;
    triggercaption?: DynamicValue<string>;
    triggertooltip?: DynamicValue<string>;
    triggericonopen?: DynamicValue<WebIcon>;
    triggericonclosed?: DynamicValue<WebIcon>;
    triggerdefault: TriggerdefaultEnum;
    triggercustom?: ReactNode;
    triggerclassopen: DynamicValue<string>;
    triggerclassclosed: DynamicValue<string>;
    triggerdelay: number;
}

export interface DataGridTwoAccordionPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    type: TypeEnum;
    observertype: ObservertypeEnum;
    observercontent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    triggertype: TriggertypeEnum;
    triggerbuttonstyle: TriggerbuttonstyleEnum;
    triggercaption: string;
    triggertooltip: string;
    triggericonopen: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    triggericonclosed: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    triggerdefault: TriggerdefaultEnum;
    triggercustom: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    triggerclassopen: string;
    triggerclassclosed: string;
    triggerdelay: number | null;
}
