all: extension.zip

extension.zip: manifest.json money.js
	rm -f $@
	zip $@ $^
