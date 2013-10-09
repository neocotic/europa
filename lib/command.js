(function() {
  var NOT_FOUND, R_HTML_EXT, exit, extension, fs, md, outputPath, parseHtml, parseOptions, parsePath, path, program, sources, writeMarkdown;

  fs = require('fs-extra');

  md = require('./md');

  path = require('path');

  program = require('commander');

  NOT_FOUND = 'ENOENT';

  R_HTML_EXT = /\.s?html?$/i;

  extension = '.md';

  sources = [];

  exit = function(code, message) {
    if (typeof code === 'string') {
      message = code;
      code = null;
    }
    if (code == null) {
      code = 0;
    }
    if (message) {
      console[code ? 'error' : 'log'](message);
    }
    return process.exit(code);
  };

  outputPath = function(source, root) {
    var dir, fileName, srcDir;

    fileName = path.basename(source, path.extname(source)) + extension;
    srcDir = path.dirname(source);
    dir = program.output ? path.join(program.output, root === '.' ? srcDir : srcDir.slice(root.length)) : srcDir;
    return path.join(dir, fileName);
  };

  parsePath = function(source, topLevel, root) {
    return fs.stat(source, function(err, stats) {
      if (err) {
        if (err.code !== NOT_FOUND) {
          throw err;
        }
        if (topLevel && !R_HTML_EXT.test(source)) {
          source = sources[sources.indexOf(source)] = "" + source + ".html";
          parsePath(source, topLevel, root);
        } else if (topLevel) {
          exit(1, "File not found: " + source);
        }
        return;
      }
      if (stats.isDirectory()) {
        return fs.readdir(source, function(err, files) {
          var file, index, _i, _len, _results;

          if (err) {
            throw err;
          }
          files = files.map(function(file) {
            return path.join(source, file);
          });
          index = sources.indexOf(source);
          [].splice.apply(sources, [index, index - index + 1].concat(files)), files;
          _results = [];
          for (_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            _results.push(parsePath(file, false, root));
          }
          return _results;
        });
      } else if (topLevel || R_HTML_EXT.test(source)) {
        return fs.readFile(source, function(err, html) {
          if (err) {
            throw err;
          }
          return parseHtml(source, html.toString(), root);
        });
      } else {
        return sources.splice(sources.indexOf(source), 1);
      }
    });
  };

  parseHtml = function(file, input, root) {
    var absolute, base, debug, err, inline, output;

    try {
      absolute = program.absolute, base = program.base, debug = program.debug, inline = program.inline;
      output = md(input, {
        absolute: absolute,
        base: base,
        debug: debug,
        inline: inline
      });
      if (program.print) {
        return console.log(output);
      } else if (file) {
        return writeMarkdown(file, output, root);
      }
    } catch (_error) {
      err = _error;
      return exit(1, err);
    }
  };

  parseOptions = function() {
    program.version(md.version).usage('[options] [ -e html | <file ...> ]').option('-a, --absolute', 'always use absolute URLs for links and images').option('-b, --base <url>', 'set base URL to resolve relative URLs from').option('-d, --debug', 'print additional debug information').option('-e, --eval', 'pass a string from the command line as input').option('-i, --inline', 'generate inline style links').option('-l, --long-ext', 'use long extension for Markdown files').option('-o, --output <dir>', 'set the output directory for converted Markdown').option('-p, --print', 'print out the converted Markdown').parse(process.argv);
    if (program.longExt) {
      extension = '.markdown';
    }
    sources = program.args.slice(0);
    if (!sources.length) {
      return program.help();
    }
  };

  writeMarkdown = function(source, markdown, root) {
    var mdDir, mdPath, write;

    mdPath = outputPath(source, root);
    mdDir = path.dirname(mdPath);
    write = function(err) {
      if (err) {
        throw err;
      }
      if (markdown.length <= 0) {
        markdown = ' ';
      }
      return fs.writeFile(mdPath, markdown, function(err) {
        if (err) {
          throw err;
        }
      });
    };
    return fs.exists(mdDir, function(exists) {
      if (exists) {
        return write();
      } else {
        return fs.mkdirs(mdDir, write);
      }
    });
  };

  exports.run = function() {
    var err, source, _i, _len, _results;

    if (process.platform !== 'win32') {
      process.on('SIGTERM', function() {
        return exit();
      });
    }
    try {
      parseOptions();
      if (program["eval"]) {
        return parseHtml(null, sources[0], process.cwd());
      } else {
        _results = [];
        for (_i = 0, _len = sources.length; _i < _len; _i++) {
          source = sources[_i];
          _results.push(parsePath(source, true, path.normalize(source)));
        }
        return _results;
      }
    } catch (_error) {
      err = _error;
      return exit(1, err);
    }
  };

}).call(this);
