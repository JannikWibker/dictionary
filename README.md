### Dictionary

this is a small dictionary implementation in node, it uses koa (and koa-related libraries) and a JSON file

this example has words from the constructed language '[High Valyrian](http://gameofthrones.wikia.com/wiki/High_Valyrian)' and English.

This JSON structure is used to represent data:

```json
{
  "word": "",
  "id": "",
  "default": false,
  "stem": "",
  "ending": "",
  "beginning": "",
  "type": "", "language": "",
  "properties": [ "", "" ],
  "translation": {
    "": [
      { "id": "", "word": "" }
    ]
  },
  "versions": [
    { "id": "", "word": "" }
  ]
}
```

most fields should be fairly obvious

the id fields are prefixed with the language id (in this case 'hv' for High Valyrian or 'eng' for English)

The routes to use the application are:
- /
- /**:language**
- /**:language**/word/**:word**
- /**:language**/id/**:id**

more will probably come soon (probably something for searching, filtering and/or ordering words)


### installation
```bash
git clone https://www.github.com/JannikWibker/dictionary.git
cd dictionary
npm install
node index.js
```
