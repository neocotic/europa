# Build Requirements
In order to build [html.md][], you need to have the following install [git][] 1.7+ and the latest version of [node.js][] 0.6+ (which includes [npm][]).

# Building
Follow these steps to build [html.md][];

1. Clone a copy of the main [html.md git repository](https://github.com/neocotic/html.md) by running `git clone git://github.com/neocotic/html.md.git`
2. `cd` to the repository directory
3. Ensure you have all of the dependencies by entering `npm install`
4. For the compiled JavaScript `cd` to the repository directory and enter `cake build`
   * Outputs `md.js` to the `lib` directory
   * Outputs `md.min.js` (optimised version) to the `dist` directory
5. To update the documentation enter `cake docs`
   * Outputs documentation to the `docs` directory
   * Not currently working on Windows as it uses linux shell commands

[git]: http://git-scm.com
[node.js]: http://nodejs.org
[npm]: http://npmjs.org
[html.md]: http://neocotic.com/html.md