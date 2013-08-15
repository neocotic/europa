This document is only relevant for those that want to contribute to the [html.md][] open source
project (we love you guys!). If you are only interested in installing the tool look at `README.md`.

## Build Requirements

In order to build [html.md][], you need to have the following install [git][] 1.7+ and [node.js][]
0.8+ (which includes [npm][]).

## Building

Follow these steps to build [html.md][];

1. Clone a copy of the main [html.md git repository](https://github.com/neocotic/html.md) by
   running `git clone git://github.com/neocotic/html.md.git`
2. `cd` to the repository directory
3. Ensure you have all of the dependencies by entering `npm install`
4. Ensure you can run [Grunt][] by running `npm install -g grunt-cli`
5. To update the compiled and runnable version enter `grunt build`
   * Outputs to the `lib` directory
6. To run the full test suite enter `grunt test`
   * **Pro Tip:** You can easily run steps 5 and 6 back-to-back by just entering `grunt`
7. To update the optimized distributable file and documentation enter `grunt dist`
   * This also compiles and tests all code to ensure the latest code is stable and used
   * Outputs to distributable file and documentation to the `dist` and `docs` directories
     respectively

## Important

If you're planning on contributing to [html.md][] please do **NOT** update the distributable file
or documentation (step 7) when submitting a pull request. We will not accept pull requests when
these files have been changed as we do this ourselves when finalizing a release.

Read the `CONTRIBUTING.md` file for more information about submitting pull requests.

[git]: http://git-scm.com
[grunt]: http://gruntjs.com
[html.md]: http://neocotic.com/html.md
[node.js]: http://nodejs.org
[npm]: http://npmjs.org
