let express = require('express');
let cmsFormsModule = require('cms-forms');

let app = express();

app.get('/', (req, res, next) => {
    let form = new cmsFormsModule.Form();
    form.method = 'POST';
    form.action = '/';
    form.encType = cmsFormsModule.FormEncoding.multiPartFormData;
    form.fields = [{
        type : 'text',
        name : 'key1',
        label : 'Enter your name'
    }, {
        type : 'Submit',
        value : 'Submit'
    }];
    res.form = form;
    next();
})

app.use(cmsFormsModule.render);

app.use((req, res, next) => {
    res.status(200).send(res.html.content);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});