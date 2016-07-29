"use strict";
const jade = require("jade");
const path = require("path");
function render(req, res, next) {
    if (res.form) {
        res.html = { content: jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form }) };
    }
    next();
}
exports.render = render;
class Form {
    constructor() {
        this.action = '/';
        this.method = 'GET';
    }
    setValues(values) {
        Object.keys(values).forEach((key) => {
            let field = this.fields.find((field) => { return field.name == key; });
            if (field) {
                field.value = values[key];
            }
        });
    }
    set fields(v) {
        this._fields = v.map(item => Object.assign({}, item));
    }
    get fields() {
        return this._fields;
    }
}
exports.Form = Form;
//# sourceMappingURL=index.js.map