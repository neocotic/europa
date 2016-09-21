# Contributing

If you have any questions about [Europa](https://github.com/Skelp/europa) please feel free to
[raise an issue](https://github.com/Skelp/europa/issues/new).

Please [search existing issues](https://github.com/Skelp/europa/issues) for the same feature and/or issue before raising
a new issue. Commenting on an existing issue is usually preferred over raising duplicate issues.

Please ensure that all files conform to the coding standards, using the same coding style as the rest of the code base.
All unit tests should be updated and passing as well. All of this can easily be checked via command-line:

``` bash
# install/update package dependencies
$ npm install
# run test suite
$ npm test
```

If you're using a version of [Node.js](https://nodejs.org) that is older than 0.12, then linting is not performed by
this step. Please consider upgrading to at least 0.12 or your pull request may fail on the CI build.

Likewise, [Node.js](https://nodejs.org) versions older than 0.10 will also not be able to compile the source code using
[Rollup](http://rollupjs.org) so the test suite will not be executed against any changes you've made to `lib`. For this
reason, 0.10 is not supported from a development perspective, but our CI builds do run the test suite against the
pre-compiled code for this version to ensure that it works.

All pull requests should be made to the `develop` branch.

Don't forget to add your details to the list of
[AUTHORS.md](https://github.com/Skelp/europa/blob/master/AUTHORS.md) if you want your contribution to be recognized by
others.
