# Custom Build of bpmn.io for Kitodo.Production

[![CI](https://github.com/Erikmitk/kitodo-workflow-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/Erikmitk/kitodo-workflow-editor/actions/workflows/ci.yml)

This project provides a custom build of the bpmn.io editor with properties panel extension for the specific use in Kitodo.Production

## How to build

This project uses [NPM](https://www.npmjs.com/) scripts to build. Install dependencies and then use the npm scripts to build:

```sh
npm install      # install dependencies
npm run build    # one-time full build → dist/
npm run dev      # build + watch for changes
```

## Build Results

When finished you'll find the final build in the `dist` directory.

- `js/modeler_min.js` — the minimized version of the editor build incl. property panel extension.
- `js/modeler_custom.js` — a JS file with additional Javascript that we need outside of the editor itself
- `css/modeler.css` — a minified file with all needed CSS rules
- `index.html` — a simple example page where you can test the editor; it contains static information to test the functionality

The non-minimized/non-concatenated files can be found in the `build` directory.

## Testing

Unit tests use [Jest](https://jestjs.io/). Run them with:

```sh
npm test
```

Tests cover the properties panel helpers and localization utilities in `src/provider/template/`.

## Auto-Update NPM dependencies

We recommend [setting up a post-merge hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) in your repository to auto-update NPM dependencies. Simply create the post-merge file with the following content in the `.git/hooks` directory of the repository. Make sure the file is executable.

```
changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"
check_run() {
    echo "$changed_files" | grep --quiet "$1" && eval "$2"
}

check_run package.json "npm install"
```

This hook will check for changes in the `package.json` and will run `npm install` to update the installed dependencies accordingly. Without this hook you have to do this manually after changes to package.json have been made to stay up-to-date.
