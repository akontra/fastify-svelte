
import fp from 'fastify-plugin'

import {join} from 'path'

const assetUrlConstructor = () => (page, type) =>  {
    return `/views/templates/${page}.${type}`;
};

const defaultOptions = {
    assetUrlConstructor: assetUrlConstructor,
    svelteTemplatesPath: '../views/templates'
};

export default fp((fastify, options, next) =>{
    const {
        assetUrlConstructor,
        svelteTemplatesPath,
    } = {...defaultOptions, ...options};

    const assetUrl = assetUrlConstructor(fastify);

    const loadTemplate = page => import(`${svelteTemplatesPath}/${page}.js`).then(module => module.default);

    fastify.decorateReply('view', async function (page, props){
        const reply = this;

        const view = await loadTemplate(page);
        const { html, head } = view.render(props);

        const render = await loadTemplate('base')

        const replaces = {
            content: html,
            css: assetUrl(page, 'css'),
            head,
            props: JSON.stringify(props),
            script: assetUrl(page, 'js'),
        };
        const rendered = render(replaces);
        reply.type('text/html').send(rendered);
    });

    next();
});

