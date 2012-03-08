(function () {
	function addChild(node) {
		node._parent = this;
		this._children.push(node);
	}

	function has(node) {
		return -1 !== this._children.indexOf(node);
	}

	function getChildren() {
		return this._children;
	}

	function getParent() {
		return this._parent;
	}

	function init() {
		this._children = [];
	}

	window.datastructures = window.datastructures || {};
	var treenode = window.datastructures.treenode = {
		"addChild": addChild,
		"has": has,
		"getChildren": getChildren,
		"getParent": getParent,
		"init": init
	};
}());