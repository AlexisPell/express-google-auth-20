import { IRequest } from './typings/express';
import express, { Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passport-setup';

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    cookieSession({
      name: 'first-session',
      keys: ['key1', 'key2'],
    })
  );

  const isLoggedIn = (req: any, res: any, next: any) => {
    if (req.user) next();
    if (!req.user) res.sendStatus(401);
  };

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res: Response) => {
    res.send('Hello world');
  });

  app.get('/failed', (req, res) => {
    res.send('Failed to authorize');
  });
  app.get('/success', isLoggedIn, (req, res) => {
    res.send({
      msg: 'Successfully authorized',
      user: req.user,
    });
  });

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/success');
    }
  );

  app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  });

  return app.listen(5000, () => console.log('Listening on port 5000'));
};
main();
