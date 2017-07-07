"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jade = require("jade");
const path = require("path");
function render(req, res, next) {
    if (res.form) {
        res.html = Object.assign(res.html, { content: jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form }) });
        delete res.form;
    }
    next();
}
exports.render = render;
exports.WidgetTypes = {
    TextField: 'text',
    TextArea: 'textarea',
    Password: 'password',
    Select: 'select',
    CheckBox: 'checkbox',
    FancyCheckBox: 'fancy-checkbox',
    Radio: 'radio',
    MarkDownEditor: 'MDE',
    Submit: 'submit',
    HTMLEditor: 'HTML',
    Hidden: 'hidden'
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
                if (field.type == exports.WidgetTypes.CheckBox && values[key]) {
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