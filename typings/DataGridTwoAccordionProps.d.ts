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

export interface DataGridTwoAccordionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    type: TypeEnum;
    attributename: string;
    observertype: ObservertypeEnum;
    observercontent?: ReactNode;
    observerselectedclass: boolean;
    observerrowclassopen: DynamicValue<string>;
    observercolclassopen: DynamicValue<string>;
    triggertype: TriggertypeEnum;
    triggerbuttonstyle: TriggerbuttonstyleEnum;
    triggercaption?: DynamicValue<string>;
    triggertooltip?: DynamicValue<string>;
    triggeropendefault: DynamicValue<boolean>;
    triggercustom?: ReactNode;
    triggerdelay: number;
    triggericonopen?: DynamicValue<WebIcon>;
    triggerclassopen: DynamicValue<string>;
    triggericonclosed?: DynamicValue<WebIcon>;
    triggerclassclosed: DynamicValue<string>;
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
    attributename: string;
    observertype: ObservertypeEnum;
    observercontent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    observerselectedclass: boolean;
    observerrowclassopen: string;
    observercolclassopen: string;
    triggertype: TriggertypeEnum;
    triggerbuttonstyle: TriggerbuttonstyleEnum;
    triggercaption: string;
    triggertooltip: string;
    triggeropendefault: string;
    triggercustom: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    triggerdelay: number | null;
    triggericonopen: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    triggerclassopen: string;
    triggericonclosed: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    triggerclassclosed: string;
}
