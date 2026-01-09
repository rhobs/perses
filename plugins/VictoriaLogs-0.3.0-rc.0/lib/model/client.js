// Copyright 2025 The Perses Authors
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
function buildUrl(path, datasourceUrl) {
    if (datasourceUrl.startsWith('http://') || datasourceUrl.startsWith('https://')) {
        return new URL(path, datasourceUrl);
    }
    let fullPath = datasourceUrl;
    // Assume relative path, ensure no double slashes
    if (datasourceUrl.endsWith('/') && path.startsWith('/')) {
        fullPath = datasourceUrl + path.slice(1);
    } else if (!datasourceUrl.endsWith('/') && !path.startsWith('/')) {
        fullPath = datasourceUrl + '/' + path;
    } else {
        fullPath = datasourceUrl + path;
    }
    return new URL(fullPath, window.location.origin);
}
export async function streamQueryRange(params, options) {
    const url = buildUrl('/select/logsql/query', options.datasourceUrl);
    const postData = {
        query: params.query,
        start: params.start,
        end: params.end
    };
    if (params?.limit) postData['limit'] = params.limit.toString();
    if (params?.offset) postData['offset'] = params.offset.toString();
    const data = new URLSearchParams(postData).toString();
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/stream+json',
            ...options.headers
        },
        body: data
    });
    if (response.status !== 200) {
        throw new Error(await response.text());
    }
    const output = [];
    if (!response?.body) return output;
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';
    while(true){
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {
            stream: true
        });
        let boundary = buffer.indexOf('\n');
        while(boundary !== -1){
            const line = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 1);
            output.push(JSON.parse(line));
            boundary = buffer.indexOf('\n');
        }
    }
    if (buffer.trim().length > 0) {
        output.push(JSON.parse(buffer));
    }
    return output;
}
export async function statsQueryRange(params, options) {
    const url = buildUrl('/select/logsql/stats_query_range', options.datasourceUrl);
    const postData = {
        query: params.query,
        start: params.start,
        end: params.end
    };
    if (params?.step) postData['step'] = params.step.toString();
    const data = new URLSearchParams(postData).toString();
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            ...options.headers
        },
        body: data
    });
    return await response.json();
}
export async function fieldNames(params, options) {
    const url = buildUrl('/select/logsql/field_names', options.datasourceUrl);
    const postData = {
        query: params.query
    };
    if (params.start) postData['start'] = params.start;
    if (params.end) postData['end'] = params.end;
    const data = new URLSearchParams(postData).toString();
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            ...options.headers
        },
        body: data
    });
    return await response.json();
}
export async function fieldValues(params, options) {
    const url = buildUrl(`/select/logsql/field_values`, options.datasourceUrl);
    const postData = {
        query: params.query,
        field: params.field
    };
    if (params.start) postData['start'] = params.start;
    if (params.end) postData['end'] = params.end;
    const data = new URLSearchParams(postData).toString();
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            ...options.headers
        },
        body: data
    });
    return await response.json();
}

//# sourceMappingURL=client.js.map