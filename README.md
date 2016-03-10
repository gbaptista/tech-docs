# TechDocs

Technical documentation for complex systems.

## Syntax Highlight Support: Other Languages
- Choose your language at [CodeMirror repository](https://github.com/codemirror/CodeMirror/tree/master/mode).
- Download the `.js` file to [js/codemirror/mode](js/codemirror/mode).
- Edit the [show.html](show.html) file:
```html
<script src="js/codemirror/codemirror.js"></script>

<script src="js/codemirror/mode/yourlanguage.js"></script>

<script src="config/locales.js"></script>
```

## How to Use

Clone the project:
```
git clone https://github.com/gbaptista/tech-docs.git
de tech-docs

# Just open the index.html file. =)
```

Some browsers like Google Chrome will say:
```
Cross origin requests are only supported for protocol schemes: http....
```

In this case, just run some web server:

Simple and minimalist options:

##### Ruby:
```
ruby -run -e httpd . -p 5000
```
or 
```
ruby -rwebrick -e 'WEBrick::HTTPServer.new(Port: 5000, DocumentRoot:Dir.pwd).start'
```

##### Python:
```
python -m SimpleHTTPServer 5000
```

An then go to [localhost:5000](http://localhost:5000). =)

## New Pages
Create a new file at `pages/your-category/your-page.html`.

Edit the `index.html` file:
```html
<div class="container-fluid" id="container">
  <div class="page-header">
    <h1>Your Category</h1>
  </div>
  <div class="row">
    <div class="col-md-4">
      <div class="well well-lg">
        <a href="show.html#your-category/your-page">Your Page</a>
      </div>
    </div>
  </div>
</div>
```

## Set Language
Use the `config/locales.js` file:
```javascript
# Current language.
var tech_docs_language = 'pt-br';

var tech_docs_l18n = {};

tech_docs_l18n['en'] = {
  back_to_index: 'back to index',
  stage_number: 'Stage {number}',
  action_number: '{number} - '
}

tech_docs_l18n['pt-br'] = {
  back_to_index: 'voltar ao índice',
  stage_number:  '{number}ª Etapa',
  action_number: '{number} - '
}
```

## Use External References in Pages
Use the `config/external_references.js` file:
```javascript
var tech_docs_external_references = {
  github: {
    tag: 'github',
    replace_with: '<a href="https://github.com/search?q={text}" target="_blank">{text}</a>'
  },
  google: {
    tag: 'google',
    replace_with: '<a href="https://www.google.com.br/?gws_rd=ssl#q={text}" target="_blank">{text}</a>'
  }
}
```
Original code:
```
See the <github>tech-docs</github> project.
Search for <google>ruby language</google>. ;)
```
Result:
```
See the <a href="https://github.com/search?q=tech-docs" target="_blank">tech-docs</a> project.
Search for <a href="https://www.google.com.br/?gws_rd=ssl#q=ruby language" target="_blank">ruby language</a>. ;)
```

## Pages Syntax
Basic structure:
```html
<title>Your Page</title>

<category>Your Category</category>

<stage>
  <title>Explanation about Something</title>

  <action>
    <title>Something is a thing.</title>

    <description>
      I don't know what thing means.
    </description>
  </action>
</stage>
```
for more details see the examples: [pages/examples](pages/examples)
