(function () {
	buster.testCase("treenode module", {
		"setUp": function () {
			this.treenode = Object.create(window.datastructures.treenode);
		},

		"should exist as a property of window.datastructures": function () {
			assert.defined(window.datastructures.treenode);
		},

		"method addChild": {
			"should exist": function () {
				assert.isFunction(window.datastructures.treenode.addChild);
			},

			"should add node to children": function () {
				var
					child = Object.create(window.datastructures.treenode),
					children;
				this.treenode.init();
				this.treenode.addChild(child);

				children = this.treenode.getChildren();

				assert.same(children[0], child);
				assert.same(children[0].getParent(), this.treenode, "should update parent");
			}
		},

		"method has()": {
			"setUp": function () {
				this.treenode.init();
				this.search = Object.create(window.datastructures.treenode);
				this.search.init();
			},

			"should has": function () {
				assert.isFunction(window.datastructures.treenode.has);
			},

			"should return false if node has no children": function () {
				var result = this.treenode.has(this.search);

				assert.isFalse(result);
			},

			"should return true if search is among children": function () {
				var result;
				this.treenode.addChild(this.search);

				result = this.treenode.has(this.search);

				assert.isTrue(result);
			},

			"should return false if search is not among children": function () {
				var
					decoy = Object.create(window.datastructures.treenode),
					result;
				decoy.init();
				this.treenode.addChild(decoy);

				result = this.treenode.has(this.search);

				assert.isFalse(result);
			},

			"should call find() on child nodes": function () {
				var
					inbetween = Object.create(window.datastructures.treenode),
					hasSpy = sinon.spy(inbetween, "has");
				inbetween.init();
				inbetween.addChild(this.search);
				this.treenode.addChild(inbetween);

				this.treenode.has(this.search);

				assert.calledWith(hasSpy, this.search);
			}
		},

		"method getChildren()": {
			"should exist": function () {
				assert.isFunction(window.datastructures.treenode.getChildren);
			}
		},

		"method getParent()": {
			"should exist": function () {
				assert.isFunction(window.datastructures.treenode.getParent);
			}
		},

		"method init": {
			"should exist": function () {
				assert.isFunction(window.datastructures.treenode.init);
			}
		}
	});
}());