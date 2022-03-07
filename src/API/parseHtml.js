const parseHtml = (description)=>{

	 //Convert the string to an HTML document
	const stringToHTML = ()=>{
		let parser = new DOMParser();
		let doc = parser.parseFromString(description, 'text/html');
		return doc.body;
	}

	//Remove <script> elements
	const removeScripts = (html)=>{
		let scripts = html.querySelectorAll('script');
		for (let script of scripts) {
			script.remove();
		}
	}

    const isPossiblyDangerous = (name, value)=>{
		let val = value.replace(/\s+/g, '').toLowerCase();
		if (val.includes('data:text/html') || name.startsWith('on')) return true;
	}

    const removeAttributes = (elem)=>{
		// Loop through each attribute
		// If it's dangerous, remove it
		let atts = elem.attributes;
		for (let {name, value} of atts) {
			if (!isPossiblyDangerous(name, value)){
                continue;
            }
			elem.removeAttribute(name);
		}

	}
	//Remove dangerous attributes from the elements
	const clean = (html)=>{
		let nodes = html.children;
		for (let node of nodes) {
			removeAttributes(node);
			clean(node);
		}
	}

	// Convert the string to HTML
	let html = stringToHTML();

	// parase html
	removeScripts(html);
	clean(html);

	return html.innerHTML;

}

export default parseHtml;

