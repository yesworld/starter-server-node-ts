# Awesome Project Build with TypeORM

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### Steps to run this project:

1. Run `yarn` or `npm i` command
2. Copy and rename `.env.example` to `.env`. Setup database settings inside this file
3. Run `yarn run sync` or `npm run sync` command for create tables in your DB
4. Migrate ?

## TODO LIST:
* [x] Error middleware
* [ ] Create relations
* [ ] Create unit tests
* [ ] Log files ?
* [ ] **class-validator v0.9** doesn't work in Routing. The same problem `IsUserAlreadyExist.ts` [issue #384](https://github.com/typestack/routing-controllers/issues/384)

``` 
# downgrade #
"class-validator": "^0.8.1",
```

## License

[MIT License](./LICENSE)

Copyright (c) @yesworld
