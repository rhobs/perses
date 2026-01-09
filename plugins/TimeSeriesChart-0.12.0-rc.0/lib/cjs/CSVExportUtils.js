// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get escapeCsvValue () {
        return escapeCsvValue;
    },
    get exportDataAsCSV () {
        return exportDataAsCSV;
    },
    get extractExportableData () {
        return extractExportableData;
    },
    get formatLegendName () {
        return formatLegendName;
    },
    get formatTimestampISO () {
        return formatTimestampISO;
    },
    get isExportableData () {
        return isExportableData;
    },
    get sanitizeColumnName () {
        return sanitizeColumnName;
    },
    get sanitizeFilename () {
        return sanitizeFilename;
    }
});
const isExportableData = (data)=>{
    return !!(data && typeof data === 'object' && 'series' in data && Array.isArray(data.series) && data.series.length > 0);
};
const extractExportableData = (queryResults)=>{
    if (!queryResults || queryResults.length === 0) return undefined;
    const allSeries = [];
    let timeRange = undefined;
    let stepMs = undefined;
    let metadata = undefined;
    queryResults.forEach((query)=>{
        if (query?.data && typeof query.data === 'object' && 'series' in query.data) {
            const data = query.data;
            if (data.series && Array.isArray(data.series) && data.series.length > 0) {
                allSeries.push(...data.series);
                if (!timeRange && data.timeRange) {
                    timeRange = data.timeRange;
                }
                if (!stepMs && data.stepMs) {
                    stepMs = data.stepMs;
                }
                if (!metadata && data.metadata) {
                    metadata = data.metadata;
                }
            }
        }
    });
    if (allSeries.length > 0) {
        return {
            series: allSeries,
            timeRange,
            stepMs,
            metadata
        };
    }
    return undefined;
};
const formatLegendName = (series, seriesIndex)=>{
    const seriesAny = series;
    let legendName = series.formattedName || series.name;
    if (!legendName || legendName === `Series ${seriesIndex + 1}`) {
        legendName = seriesAny.legendName || seriesAny.displayName || seriesAny.legend || series.name || '';
    }
    if ((!legendName || legendName === series.name) && series.labels) {
        const labels = series.labels;
        const displayLabels = {
            ...labels
        };
        const metricName = displayLabels.__name__;
        delete displayLabels.__name__;
        const labelPairs = Object.entries(displayLabels).filter(([value])=>value !== undefined && value !== null && value !== '').map(([key, value])=>`${key}="${value}"`).join(', ');
        if (metricName && labelPairs) {
            legendName = `${metricName}{${labelPairs}}`;
        } else if (metricName) {
            legendName = metricName;
        } else if (labelPairs) {
            legendName = `{${labelPairs}}`;
        } else {
            legendName = labels.job || labels.instance || labels.metric || `Series ${seriesIndex + 1}`;
        }
    }
    if (!legendName || legendName.trim() === '') {
        legendName = `Series ${seriesIndex + 1}`;
    }
    return legendName;
};
const sanitizeColumnName = (name)=>{
    return name.replace(/[,"\n\r]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').substring(0, 255);
};
const sanitizeFilename = (filename)=>{
    return filename.replace(/[<>:"/\\|?*]/g, ' ').trim().split(/\s+/).filter((word)=>word.length > 0).map((word, index)=>{
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
};
const formatTimestampISO = (timestamp)=>{
    let timestampMs;
    if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return timestamp;
        }
        timestampMs = date.getTime();
    } else {
        timestampMs = timestamp > 1e10 ? timestamp : timestamp * 1000;
    }
    const date = new Date(timestampMs);
    if (isNaN(date.getTime())) {
        return new Date(timestampMs).toISOString();
    }
    return date.toISOString();
};
const escapeCsvValue = (value)=>{
    if (value === null || value === undefined) {
        return '';
    }
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};
const exportDataAsCSV = ({ data })=>{
    if (!isExportableData(data)) {
        console.warn('No valid data found to export to CSV.');
        return new Blob([
            ''
        ], {
            type: 'text/csv;charset=utf-8'
        });
    }
    let csvString = '';
    const result = {};
    const seriesInfo = [];
    let validSeriesCount = 0;
    for(let i = 0; i < data.series.length; i++){
        const series = data.series[i];
        if (!series) {
            continue;
        }
        if (!Array.isArray(series.values) || series.values.length === 0) {
            continue;
        }
        const legendName = formatLegendName(series, i);
        const columnName = sanitizeColumnName(legendName);
        const currentSeriesInfo = {
            legendName,
            columnName: columnName || `Series_${i + 1}`,
            originalName: series.name || ''
        };
        seriesInfo.push(currentSeriesInfo);
        validSeriesCount++;
        for(let j = 0; j < series.values.length; j++){
            const entry = series.values[j];
            let timestamp;
            let value;
            if (Array.isArray(entry) && entry.length >= 2) {
                timestamp = entry[0];
                value = entry[1];
            } else if (typeof entry === 'object' && entry !== null && 'timestamp' in entry && 'value' in entry) {
                const dataPoint = entry;
                timestamp = dataPoint.timestamp;
                value = dataPoint.value;
            } else {
                continue;
            }
            if (value === null || value === undefined) {
                continue;
            }
            const dateTime = formatTimestampISO(timestamp);
            if (!result[dateTime]) {
                result[dateTime] = {};
            }
            result[dateTime][currentSeriesInfo.columnName] = value;
        }
    }
    if (validSeriesCount === 0 || seriesInfo.length === 0) {
        console.warn('No valid data found to export to CSV.');
        return new Blob([
            ''
        ], {
            type: 'text/csv;charset=utf-8'
        });
    }
    const timestampCount = Object.keys(result).length;
    if (timestampCount === 0) {
        console.warn('No valid timestamp data found to export to CSV.');
        return new Blob([
            ''
        ], {
            type: 'text/csv;charset=utf-8'
        });
    }
    const columnNames = seriesInfo.map((info)=>info.columnName);
    csvString += `DateTime,${columnNames.join(',')}\n`;
    const sortedDateTimes = Object.keys(result).sort((a, b)=>{
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return dateA - dateB;
    });
    for (const dateTime of sortedDateTimes){
        const rowData = result[dateTime];
        const values = [];
        if (rowData) {
            for (const columnName of columnNames){
                const value = rowData[columnName];
                values.push(escapeCsvValue(value));
            }
            csvString += `${escapeCsvValue(dateTime)},${values.join(',')}\n`;
        }
    }
    return new Blob([
        csvString
    ], {
        type: 'text/csv;charset=utf-8'
    });
};
