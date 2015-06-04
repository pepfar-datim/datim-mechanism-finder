System.config({
  "baseURL": ".",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "mechanism-finder/*": "src/mechanism-finder/*.js",
    "partner-finder/*": "src/partner-finder/*.js",
    "sql-view/*": "src/sql-view/*.js",
    "settings/*": "src/settings/*.js"
  }
});

System.config({
  "map": {
    "angular": "npm:angular@1.4.0",
    "angular-route": "npm:angular-route@1.4.0",
    "angular-ui-select": "github:angular-ui/ui-select@0.12.0",
    "babel": "npm:babel-core@5.4.7",
    "babel-runtime": "npm:babel-runtime@5.4.7",
    "core-js": "npm:core-js@0.9.13",
    "jquery": "github:components/jquery@2.1.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular@1.4.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.13": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

