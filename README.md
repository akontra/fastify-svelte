# Fastify svelte templating
Almost an exact replica of [@elo7/fastify-svelte](https://www.npmjs.com/package/@elo7/fastify-svelte)(MIT license) with the rollup config updated to work with [rollup-plugin-svelte 7.1.0](https://github.com/sveltejs/rollup-plugin-svelte).

## Usage

The plugin expects the following file structure:
```
|-> rollup.config.js
|-> server.js
|-> plugins/
| |-> fastify-svelte.js
|-> views/
| |-> Home.svelte
| |-> templates/
| | |-> Base.js
```

... then: 
```javascript
import Fastify from "fastify";
import svelteView from './plugins/fastify-svelte.js'

const fastify = Fastify({logger: true});

fastify.register(svelteView);

fastify.get('/', async (req, reply) => {
    reply.view('Home', { name: 'World' });
});


const start = async () => {
    try {
      await fastify.listen(3000)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
```
or:
```bash
npx degit akontra/fastify-svelte myproject
```
```bash
cd myproject
```
```bash
npm install
```

First compile using:
```bash
rollup -c
```
then run with:
```bash
node server
```

## To-do
Not that this will ever happen but: 
- currently rollup emits css files in the wrong directory, can only be fixed with a script that moves the files after building. [Look here](https://github.com/egoist/rollup-plugin-postcss/issues/250),
- only pure SSR currently works, hydration isn't implemented yet even though the `base.js` template expects it. Check [here](https://github.com/elo7/fastify-svelte-partial-hydration) for ideas on how to do that. You will have to implement plugins in the view engine as well, but that should not be that difficult, refer to [original](https://www.npmjs.com/package/@elo7/fastify-svelte).

## Why?
Bored, seemed cool. On a serious note, Svelte outputs small bundles and with partial hydration this might not be that stupid to use when most of the page is static and only a few small components need interactivity. Comes with nice css isolation too =).

## License
MIT