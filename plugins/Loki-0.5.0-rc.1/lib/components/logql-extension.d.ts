import { LRLanguage } from '@codemirror/language';
import { Extension } from '@uiw/react-codemirror';
import { AbsoluteTimeRange } from '@perses-dev/core';
import { LokiClient } from '../model';
export interface CompletionConfig {
    /** a LokiClient instance, can be created with LokiDatasource.createClient() */
    client?: LokiClient;
    /** search for label values in a given time range */
    timeRange?: AbsoluteTimeRange;
}
export declare function LogQLExtension(completionCfg?: CompletionConfig): Array<LRLanguage | Extension>;
//# sourceMappingURL=logql-extension.d.ts.map