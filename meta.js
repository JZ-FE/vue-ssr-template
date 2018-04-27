module.exports = {
  "helpers": {
    "if_not": function (v, options) {
      if (!v) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js SSR project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "lint": {
      "type": "confirm",
      "message": "Use ESLint to lint your code?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick an ESLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/feross/standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    },
    "hackernews": {
      "type": "confirm",
      "message": "Use hackernews to init your project?"
    },
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint",
    "src/components/+(Comment|Item|Spinner).vue": "hackernews",
    "src/views/+(item|list|user)/*": "hackernews",
    "src/assets/+(back-btn|icon-menu).png": "!hackernews",
    "src/components/+(AppHeader|AppFooter|AppBanner).vue": "!hackernews",
    "src/views/home/*": "!hackernews",
  },
  "skipInterpolation": "src/+(components|views)/**/*.vue",
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev"
};
