(function() {
  var NOT_FOUND, OptionParser, R_HTML_EXT, SWITCHES, exit, extension, fs, md, opts, outputPath, parseHtml, parseOptions, parsePath, path, sources, writeMarkdown;

  fs = require('fs-extra');

  md = require('./md');

  path = require('path');

  OptionParser = require('optparse').OptionParser;

  NOT_FOUND = 'ENOENT';

  R_HTML_EXT = /\.s?html?$/i;

  SWITCHES = [['-a', '--absolute', 'always use absolute URLs for links'], ['-d', '--debug', 'print additional debug information'], ['-e', '--eval', 'pass a string from the command line as input'], ['-h', '--help', 'display this help information'], ['-l', '--long-ext', 'use long extension for Markdown files'], ['-o', '--output DIR', 'set the output directory for converted Markdown'], ['-p', '--print', 'print out the converted Markdown'], ['-v', '--version', 'display the version number']];

  extension = '.md';

  opts = {
    absolute: false,
    debug: false,
    "eval": false,
    longExt: false,
    output: null,
    print: false
  };

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

  outputPath = function(source, base) {
    var dir, fileName, srcDir;

    fileName = path.basename(source, path.extname(source)) + extension;
    srcDir = path.dirname(source);
    dir = opts.output ? path.join(opts.output, base === '.' ? srcDir : srcDir.slice(base.length)) : srcDir;
    return path.join(dir, fileName);
  };

  parsePath = function(source, topLevel, base) {
    return fs.stat(source, function(err, stats) {
      if (err) {
        if (err.code !== NOT_FOUND) {
          throw err;
        }
        if (topLevel && !R_HTML_EXT.test(source)) {
          source = sources[sources.indexOf(source)] = "" + source + ".html";
          parsePath(source, topLevel, base);
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
            _results.push(parsePath(file, false, base));
          }
          return _results;
        });
      } else if (topLevel || R_HTML_EXT.test(source)) {
        return fs.readFile(source, function(err, html) {
          if (err) {
            throw err;
          }
          return parseHtml(source, html.toString(), base);
        });
      } else {
        return sources.splice(sources.indexOf(source), 1);
      }
    });
  };

  parseHtml = function(file, input, base) {
    var err, output;

    try {
      output = md(input, opts);
      if (opts.print) {
        return console.log(output);
      } else if (file) {
        return writeMarkdown(file, output, base);
      }
    } catch (_error) {
      err = _error;
      return exit(1, err);
    }
  };

  parseOptions = function() {
    var parser;

    parser = new OptionParser(SWITCHES);
    parser.banner = 'Usage: md [options] [ -e html | file.html ] [arguments]';
    parser.options_title = 'Options:';
    parser.on('*', function(opt, val) {
      opt = opt.replace(/-([a-z])/gi, function(match, char) {
        return char.toUpperCase();
      });
      if (typeof opts[opt] === 'boolean') {
        return opts[opt] = !opts[opt];
      } else if (val != null) {
        return opts[opt] = val;
      }
    });
    parser.on('help', function() {
      return exit(parser.toString());
    });
    parser.on('version', function() {
      return exit("html.md version " + md.version);
    });
    if (opts.longExt) {
      extension = '.markdown';
    }
    sources = parser.parse(process.argv).slice(2);
    if (!sources.length) {
      return exit(parser.toString());
    }
  };

  writeMarkdown = function(source, markdown, base) {
    var mdDir, mdPath, write;

    mdPath = outputPath(source, base);
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
      if (opts["eval"]) {
        return parseHtml(null, sources[0], opts);
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
