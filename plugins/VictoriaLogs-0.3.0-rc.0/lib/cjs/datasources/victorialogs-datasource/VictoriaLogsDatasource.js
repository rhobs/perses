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
Object.defineProperty(exports, "VictoriaLogsDatasource", {
    enumerable: true,
    get: function() {
        return VictoriaLogsDatasource;
    }
});
const _client = require("../../model/client");
const _VictoriaLogsDatasourceEditor = require("./VictoriaLogsDatasourceEditor");
const createClient = (spec, options)=>{
    const { directUrl, proxy } = spec;
    const { proxyUrl } = options;
    const datasourceUrl = directUrl ?? proxyUrl;
    if (datasourceUrl === undefined) {
        throw new Error('No URL specified for VictoriaLogs client. You can use directUrl in the spec to configure it.');
    }
    const specHeaders = proxy?.spec.headers;
    return {
        options: {
            datasourceUrl
        },
        streamQueryRange: (params, headers)=>(0, _client.streamQueryRange)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        statsQueryRange: (params, headers)=>(0, _client.statsQueryRange)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        fieldNames: (params, headers)=>(0, _client.fieldNames)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        fieldValues: (params, headers)=>(0, _client.fieldValues)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            })
    };
};
const VictoriaLogsDatasource = {
    createClient,
    OptionsEditorComponent: _VictoriaLogsDatasourceEditor.VictoriaLogsDatasourceEditor,
    createInitialOptions: ()=>({
            directUrl: ''
        })
};
