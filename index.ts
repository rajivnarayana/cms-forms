import * as jade from "jade";
import * as path from "path";

declare var __dirname;

export function render(req, res, next) {
    if (res.form) {
        res.html = Object.assign( res.html|| {}, {content : jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form })});
        delete res.form;
    }
    next();
}

export var WidgetTypes = {
    TextField : 'text',
    TextArea : 'textarea',
    Password : 'password',
    Select : 'select',
    CheckBox : 'checkbox',
    FancyCheckBox : 'fancy-checkbox',
    Radio : 'radio',
    MarkDownEditor : 'MDE',
    Submit : 'submit',
    HTMLEditor : 'HTML',
    Hidden : 'hidden'
}

export enum FormEncoding {
    text,
    urlEncoded,
    multiPartFormData,
    default
}

export class Form {

    private _fields : any[];
    public action: String;
    public method: String;
    public encType : FormEncoding = FormEncoding.default;

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

    get encoding() : String {
        switch(this.encType) {
            case FormEncoding.text:
                return "text/plain";
            case FormEncoding.multiPartFormData:
                return "multipart/form-data";
            case FormEncoding.urlEncoded: 
                return "application/x-www-form-urlencoded";
            default :
                return null;
        }
    }
}
