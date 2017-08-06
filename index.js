const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const koaBody = require('koa-body');
const views = require('koa-views');
const serve = require('koa-static-server')
const path = require('path');
const Router = require('koa-router')
const api = new Router({
  prefix: '/api'
})
const user = new Router({
  prefix: ''
})

const data = require('./dictionary.json')

const render = views(path.join(__dirname, '/views'), {
  map: { html: 'swig' }
})

const getById = (language, id) => {
  if(data[language])
    return data[language].words
      .map(x => x.id === id || x.id === language + id ? x : false)
      .filter(x => x)[0]
}

const getByWord = (language, word) => {
  if(data[language])
    return data[language].words
      .map(x => x.word === word ? x : false)
      .filter(x => x)[0]
}

user.get('/', async (ctx, next) => {
  await ctx.render('index', {languages: [
    { name: 'High Valyrian', id_prefix: 'hv' },
    { name: 'English', id_prefix: 'eng' }
  ]})
})

user.get('/:language', async (ctx, next) => {
  if(data[ctx.params.language]) {
    await ctx.render('language', data[ctx.params.language])
  }
})

user.get('/:language/word/:word', async (ctx, next) => {
  const word_data = getByWord(ctx.params.language, ctx.params.word)
  if(word_data) {
    await ctx.render('word', word_data)
  } else {
    await ctx.render('404', {text: 'could not find: ' + ctx.params.word})
  }
})

user.get('/:language/id/:id', async (ctx, next) => {
  const word_data = getById(ctx.params.language, ctx.params.id)
  if(word_data) {
    await ctx.render('word', word_data)
  } else {
    await ctx.render('404', {text: 'could not find: ' + ctx.params.id})
  }
})

api.get('/', (ctx, next) => {
  ctx.body = data
});

api.get('/:language', (ctx, next) => {
  ctx.body = data[ctx.params.language] || 'not found'
})

api.get('/:language/id/:id', (ctx, next) => {
  ctx.body = getById(ctx.params.language, ctx.params.id) || 'not found'
})

api.get('/:language/word/:word', (ctx, next) => {
  ctx.body = getByWord(ctx.params.language, ctx.params.word) || 'not found'
})

app
  .use(json())
  .use(render)
  .use(koaBody())
  .use(serve({rootDir: 'static', rootPath: '/static'}))
  .use(user.routes())
  .use(user.allowedMethods())
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(3000)
