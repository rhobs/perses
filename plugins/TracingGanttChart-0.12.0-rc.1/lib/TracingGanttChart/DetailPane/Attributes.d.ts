import { ReactElement } from 'react';
import { otlpcommonv1 } from '@perses-dev/core';
import { Span, Trace } from '../trace';
import { CustomLinks } from '../../gantt-chart-model';
export interface TraceAttributesProps {
    customLinks?: CustomLinks;
    trace: Trace;
    span: Span;
}
export declare function TraceAttributes(props: TraceAttributesProps): import("react/jsx-runtime").JSX.Element;
export interface AttributeListProps {
    customLinks?: CustomLinks;
    attributes: otlpcommonv1.KeyValue[];
}
export declare function AttributeList(props: AttributeListProps): ReactElement;
interface AttributeItemsProps {
    customLinks?: CustomLinks;
    attributes: otlpcommonv1.KeyValue[];
}
export declare function AttributeItems(props: AttributeItemsProps): ReactElement;
interface AttributeItemProps {
    name: string;
    value: string;
    link?: string;
}
export declare function AttributeItem(props: AttributeItemProps): ReactElement;
export {};
//# sourceMappingURL=Attributes.d.ts.map