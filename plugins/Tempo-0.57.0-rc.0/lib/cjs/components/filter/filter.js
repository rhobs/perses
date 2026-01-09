/** A model of a filter bar for common tracing attributes. All attributes are combined with AND, the values of an attribute are combined with OR. */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "splitByUnquotedWhitespace", {
    enumerable: true,
    get: function() {
        return splitByUnquotedWhitespace;
    }
});
function splitByUnquotedWhitespace(x) {
    let quote = false;
    let from = 0;
    const chunks = [];
    for(let i = 0; i < x.length; i++){
        if (x[i] == '"' && x[i - 1] != '\\') {
            quote = !quote;
        } else if (x[i] == ' ' && !quote) {
            chunks.push(x.slice(from, i));
            from = i + 1;
        }
    }
    chunks.push(x.slice(from, x.length));
    return chunks.filter((x)=>x);
}
