import * as jade from "jade";
import * as path from "path";

declare var __dirname;

export function render(req, res, next) {
    if (res.form) {
        res.html = Object.assign({content : jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form })}, res.html);
        delete res.form;
    }
    next();
}

export var WidgetTypes = {
    TextField : 'text',
    Password : 'password',
    Select : 'select',
    CheckBox : 'checkbox',
    Radio : 'radio',
    MarkDownEditor : 'MDE',
    Submit : 'submit'
}

export class Form {

    private _fields : any[];
    public action: String;
    public method: String;
    constructor() {
        this.action = '/';
        this.method = 'GET';
    }
    setValues(values) {
        Object.keys(values).forEach((key) => {
            let field = this.fields.find((field) => { return field.name == key; });
            if (field) {
                if (field.type == WidgetTypes.CheckBox && values[key]) {
                    field.checked = true;
                }
                field.value = values[key];
            }
        });
    }
    set fields(v : any) {
        this._fields = v.map(item => Object.assign({}, item));
    }
    get fields() {
        return this._fields;
    }
}
