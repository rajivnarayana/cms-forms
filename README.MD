## Usage
From sample
```javascript
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
```