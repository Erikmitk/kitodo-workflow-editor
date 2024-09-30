# Custom Build of bpmn.io for Kitodo.Production

This project provides a custom build of the bpmn.io editor with properties panel extension for the specific use in Kitodo.Production

## How to build

This project comes with a [Grunt](https://gruntjs.com/) setup with all the necessary [NPM packages](https://www.npmjs.com/) to build it. You can simply get it running by installing the local needs of NPM with `npm install` on your command line from the root directory. After that, just type `grunt` to start the build process. Additionally, grunt will watch the directories for changes and generates a new build on the fly if anything changes.

## Build Results

When finished you'll find the final build in the `dist` directory.

- `js/modeler_min.js` — the minimized version of the editor build incl. property panel extension.
- `js/modeler_custom.js` — a JS file with additional Javascript that we need outside of the editor itself
- `css/modeler.css` — a minified file with all needed CSS rules
- `index.html` — a simple example page where you can test the editor; it contains static information to test the functionality

The non-minimized/non-concatenated files can be found in the `build` directory.

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
