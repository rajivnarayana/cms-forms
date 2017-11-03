"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jade = require("jade");
const path = require("path");
function render(req, res, next) {
    if (res.form) {
        res.html = Object.assign(res.html || {}, { content: jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form }) });
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
var FormEncoding;
(function (FormEncoding) {
    FormEncoding[FormEncoding["text"] = 0] = "text";
    FormEncoding[FormEncoding["urlEncoded"] = 1] = "urlEncoded";
    FormEncoding[FormEncoding["multiPartFormData"] = 2] = "multiPartFormData";
    FormEncoding[FormEncoding["default"] = 3] = "default";
})(FormEncoding = exports.FormEncoding || (exports.FormEncoding = {}));
class Form {
    constructor() {
        this.encType = FormEncoding.default;
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
    get encoding() {
        switch (this.encType) {
            case FormEncoding.text:
                return "text/plain";
            case FormEncoding.multiPartFormData:
                return "multipart/form-data";
            case FormEncoding.urlEncoded:
                return "application/x-www-form-urlencoded";
            default:
                return null;
        }
    }
}
exports.Form = Form;
//# sourceMappingURL=index.js.map