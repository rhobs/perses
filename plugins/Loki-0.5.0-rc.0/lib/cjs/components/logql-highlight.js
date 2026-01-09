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
Object.defineProperty(exports, "logqlHighlight", {
    enumerable: true,
    get: function() {
        return logqlHighlight;
    }
});
const _highlight = require("@lezer/highlight");
const logqlHighlight = (0, _highlight.styleTags)({
    LineComment: _highlight.tags.comment,
    'Identifier StreamSelector': _highlight.tags.labelName,
    'LabelName LabelMatcher': _highlight.tags.labelName,
    String: _highlight.tags.string,
    'Number Float Duration': _highlight.tags.number,
    'LogRangeAggregation VectorAggregation': _highlight.tags.function(_highlight.tags.keyword),
    'And Or Unless': _highlight.tags.logicOperator,
    'Eq Neq Re Nre Gt Lt Gte Lte': _highlight.tags.compareOperator,
    'Add Sub Mul Div Mod Pow': _highlight.tags.arithmeticOperator,
    Pipe: _highlight.tags.operator,
    'By Without': _highlight.tags.keyword,
    '( )': _highlight.tags.paren,
    '[ ]': _highlight.tags.squareBracket,
    '{ }': _highlight.tags.brace,
    '⚠': _highlight.tags.invalid
});
