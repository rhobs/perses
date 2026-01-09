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
    get MOCK_LOGS_QUERY_DEFINITION () {
        return MOCK_LOGS_QUERY_DEFINITION;
    },
    get MOCK_LOGS_QUERY_RESULT () {
        return MOCK_LOGS_QUERY_RESULT;
    }
});
const MOCK_LOGS_QUERY_RESULT = {
    logs: {
        hasMore: false,
        timeRange: {
            start: new Date(1666625490),
            end: new Date(1666625535)
        },
        entries: [
            {
                timestamp: 1666625490,
                line: 'foo',
                labels: {
                    device: '/dev/vda1',
                    env: 'demo',
                    fstype: 'ext4',
                    instance: 'demo.do.prometheus.io:9100',
                    job: 'node',
                    mountpoint: '/'
                }
            },
            {
                timestamp: 1666625491,
                line: 'bar',
                labels: {
                    device: '/dev/vda15',
                    env: 'demo',
                    fstype: 'vfat',
                    instance: 'demo.do.prometheus.io:9100',
                    job: 'node',
                    mountpoint: '/boot/efi'
                }
            }
        ]
    }
};
const MOCK_LOGS_QUERY_DEFINITION = {
    kind: 'LogsQuery',
    spec: {
        plugin: {
            kind: 'LokiLogsQuery',
            spec: {
                query: ''
            }
        }
    }
};
