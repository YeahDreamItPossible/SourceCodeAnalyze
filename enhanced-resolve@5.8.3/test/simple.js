var should = require("should");

var path = require("path");
var resolve = require("..");

describe("simple", function () {
	var pathsToIt = [
		[__dirname, "../lib/index", "direct"],
		[__dirname, "..", "as directory"],
		[path.join(__dirname, "..", ".."), "./enhanced-resolve", "as module"],
		[
			path.join(__dirname, "..", ".."),
			"./enhanced-resolve/lib/index",
			"in module"
		]
	];
	pathsToIt.forEach(function (pathToIt) {
		it("should resolve itself " + pathToIt[2], function (done) {
			resolve(pathToIt[0], pathToIt[1], function (err, filename) {
				if (err)
					return done(
						new Error([err.message, err.stack, err.details].join("\n"))
					);
				should.exist(filename);
				filename.should.have.type("string");
				filename.should.be.eql(path.join(__dirname, "..", "lib", "index.js"));
				done();
			});
		});
		it("should resolve itself sync " + pathToIt[2], function () {
			var filename = resolve.sync(pathToIt[0], pathToIt[1]);
			should.exist(filename);
			filename.should.have.type("string");
			filename.should.be.eql(path.join(__dirname, "..", "lib", "index.js"));
		});
	});
});
