
## Util fn 

```js
function generateTemplateArray(template) {
    const lines = template.split('\n');
    return lines;
}
```

## Usage

```js
generateTemplateArray(`
    <TextField
        label="$1"
        type="number"
        inputProps={{
            min: 0,
            max: 0,
        }}
        variant="outlined"
        {...register('$2'), {
            valueAsNumber: true,
        }}
        error={!!errors.$2}
        helperText={errors.$2 ? errors.$2.message : ''}
    />
`);
```