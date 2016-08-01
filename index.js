"use strict";
const jade = require("jade");
const path = require("path");
function render(req, res, next) {
    if (res.form) {
        res.html = Object.assign({ content: jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form }) }, res.html);
        delete res.form;
    }
    next();
}
exports.render = render;
exports.WidgetTypes = {
    TextField: 'text',
    Password: 'password',
    Select: 'select',
    CheckBox: 'checkbox',
    Radio: 'radio',
    Submit: 'submit'
};
class Form {
    constructor() {
        this.action = '/';
        this.method = 'GET';
    }
    setValues(values) {
        Object.keys(values).forEach((key) => {
            let field = this.fields.find((field) => { return field.name == key; });
            if (field) {
                if (field.type == exports.WidgetTypes.CheckBox && field.value) {
                    field.checked = true;
                }
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