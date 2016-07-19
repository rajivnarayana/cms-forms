import * as jade from "jade";
import * as path from "path";

export function render(req, res, next) {
    if (res.form) {
        res.html = {content : jade.renderFile(path.join(__dirname, './form.jade'), { form: res.form })};
    }
    next();
}

Array.prototype.clone = function() { 
    return this.map(item => Object.assign({}, item));
}

export class Form {
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
        this._fields = v.clone();
    }
    get fields() {
        return this._fields;
    }
}
