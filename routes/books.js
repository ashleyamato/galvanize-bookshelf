'use strict';

const express = require('express')
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router()

router.get('/books', (req,res,next) =>{
  return knex('books')
  .select('updated_at AS updatedAt', 'cover_url AS coverUrl', 'created_at AS createdAt', 'id AS id', 'description AS description', 'title AS title', 'genre AS genre', 'author AS author')
  .orderBy('title')
  .then((data)=> res.status(200).send(data))
})

router.get('/books/:id', (req,res,next)=> {
  return knex('books')
  .where('id', req.params.id)
  .first('updated_at AS updatedAt', 'cover_url AS coverUrl', 'created_at AS createdAt', 'id AS id', 'description AS description', 'title AS title', 'genre AS genre', 'author AS author')
  .then((data)=> res.status(200).send(data))
})

router.post('/books', (req,res,next)=>{
  return knex('books')
  .insert({
    title: req.body.title,
    author:req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })
  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'description',  'id'])
  .then((data)=> res.status(200).send(data[0]))
})

router.patch('/books/:id', (req,res,next)=>{
  return knex('books')
  .update({
    title: req.body.title,
    author:req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
  })
  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'description',  'id'])
  .then((data)=> res.status(200).send(data[0]))
})

router.delete('/books/:id', (req,res,next)=>{
  return knex('books')
  .where('id', req.params.id)
  .del()
  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'created_at AS createdAt', 'description'])
  .then((data)=> res.status(200).send(data))
})

module.exports = router
