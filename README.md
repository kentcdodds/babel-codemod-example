# babel-codemod-example

When ES modules land in Node, it will be impossible to do this:

```javascript
import {thing} from './common-js-module'
```

Because CommonJS is not statically analyzable. However many people (myself included) have been doing this for a long time:

```javascript
import {readFile} from 'fs'
```

In [this quick video](http://kcd.im/babel-codemod-video), I show you a quick babel plugin I wrote to do a codemod on my code to fix this automatically.
