![Europa Build](https://raw.githubusercontent.com/neocotic/europa-branding/main/assets/banner/europa-build/europa-build-banner-738x200.png)

[Europa Build](https://github.com/neocotic/europa/tree/main/packages/europa-build) is a tool for generating and
maintaining [Europa](https://github.com/neocotic/europa) plugin and preset packages.

[![Build Status](https://img.shields.io/github/workflow/status/neocotic/europa/CI/main?style=flat-square)](https://github.com/neocotic/europa/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/europa-build.svg?style=flat-square)](https://github.com/neocotic/europa/raw/main/packages/europa-build/LICENSE.md)
[![Release](https://img.shields.io/npm/v/europa-build.svg?style=flat-square)](https://npmjs.com/package/europa-build)

* [Install](#install)
* [API](#api)
* [CLI](#cli)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using your preferred package manager. For example;

``` bash
$ npm install --save-dev europa-build
```

You'll need to have at least [Node.js](https://nodejs.org) 12.22.0 or newer.

This package is intended for generating [Europa](https://github.com/neocotic/europa) plugins and preset packages as well
as also being used by those generated packages to ensure a smooth and consistent maintenance.

While it does come with an API, the primary intended usage is its CLI. If you want to use the command line interface to
generate plugins and/or presets, you'll most likely want to install it globally so that you can run `europa-build` from
anywhere:

``` bash
$ npm install --global europa-build
```

## API

Since the primary usage of this package is the CLI the API is simply what is used to help support the CLI.

You can generate plugin/preset packages:

``` typescript
import { TemplateManager, TemplateProviderType } from 'europa-build';

const templateManager = new TemplateManager();
console.log(templateManager.getProvidersForType(TemplateProviderType.Plugin));
//=> ["contrib", "official"]
const templateProvider = manager.getProvider('contrib', TemplateProviderType.Plugin);
const templateGenerator = templateProvider.createGenerator();

(async () => {
  const templateContext = await templateProvider.createContext({
    authorName: 'ghost',
    name: 'example', // Transformed to "europa-plugin-example"
    repositoryUrl: 'https://github.com/ghost/europa-plugin-example.git',
    authorEmail: 'ghost@github.com', // Optional
    authorUrl: 'https://github.com/ghost', // Optional
    bugsUrl: 'https://github.com/ghost/europa-plugin-example/issues', // Optional
    description: 'Europa plugin example', // Optional; defaults to "TODO: Description"
    homepageUrl: 'https://github.com/ghost/europa-plugin-example', // Optional
    keywords: ['example'], // Optional; defaults to empty array
    version: '1.2.3', // Optional; defaults to "1.0.0" 
  });
  await templateGenerator.generate(templateContext, 'path/to/parent');
})();
```

Or run scripts to maintain your plugin/preset package:

``` typescript
import { ScriptRunner } from 'europa-build';

const scriptRunner = new ScriptRunner();
console.log(scriptManager.getScriptNames());
//=> ["build", "flint", "format", "lint", "test"]

(async () => {
  await scriptRunner.run('build', {
    cwd: 'path/to/parent/europa-plugin-example', // Optional; defaults to process.cwd()
  });
})();
```

## CLI

    Usage: europa-build [options] [command]
    
    Options:
      -V, --version                         output the version number
      -h, --help                            display help for command
    
    Commands:
      generate-plugin [options] <template>  generate a plugin package
      generate-preset [options] <template>  generate a preset package
      run-script [options] <name>           run the named script
      help [command]                        display help for command

Typically, you'll only generate plugins/presets using the `contrib` template as the `official` assumes the package will
be maintained with the [Europa](https://github.com/neocotic/europa) monorepo.

## Bugs

If you have any problems with Europa Build or would like to see changes currently in development you can do so
[here](https://github.com/neocotic/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/neocotic/europa/blob/main/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/neocotic/europa/blob/main/AUTHORS.md).

## License

Copyright © 2022 neocotic

See [LICENSE.md](https://github.com/neocotic/europa/raw/main/packages/europa-build/LICENSE.md) for more information on
our MIT license.
