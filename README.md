# TechDocs

Technical documentation for complex systems.

## How to Use:

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
