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