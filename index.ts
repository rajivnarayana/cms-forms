import * as jade from "jade";
import * as path from "path";

export function render(req, res, next) {
    if (res.form) {
        res.html = {content : jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form })};
    }
    next();
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
