const postRouter = require('express').Router();
const sharp = require('sharp');
const fs = require('fs/promises');
const { Post, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');


 postRouter.route('/').get(async (req, res) => {
  try {
    const xs = await Post.findAll();
    res.json(xs);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

postRouter.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).send('Маршрут не найден');
    }
    res.json(post);
  } catch (err) {
    res.status(500).send(err.message); // выводит подрробно конкретный маршрут
  }
});

postRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const xs = await Post.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(xs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const post = await Post.create({
        name: req.body.name, // название колонки
        bonus: req.body.bonus,
        money: req.body.money, 
        city: req.body.city,
        image: req.body.image,
        country: req.body.country,
        time: req.body.time,
        userId: res.locals.user.id,
      });

      const plainX = await Post.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

postRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const x = await Post.findByPk(req.params.id);
    if (!x) {
      return res.status(404).json({ message: 'X not found' });
    }
    if (x.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }
    await x.destroy();
    res.json({ message: 'X deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

postRouter.route('/:id').put(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { name, city, country, time, image, bonus } = req.body;

  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }

    // Обновление записи с новыми данными
    post.name = name ?? post.name;
    post.city = city ?? post.city;
    post.country = country ?? post.country;
    post.time = time ?? post.time;
    post.image = image ?? post.image;
    post.bonus = bonus ?? post.bonus;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = postRouter;