import * as express from 'express';
import { getRepository } from 'typeorm';
import { User } from '../src/entity/User';

const router = express.Router();

interface userDTO {
  id: string,
  firstName: string,
  lastName: string,
  email: string
}


const userDTOMapper = (user: User) => {
  if (!user) {
      return undefined;
  }
  return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
  }
}

function getTime() {
  const date = new Date();
  return `${date.getHours()}h:${date.getMinutes()}m:${date.getSeconds()}s:${date.getMilliseconds()}ms`;
}

export const requestInformations:express.RequestHandler = function (req: express.Request,res: express.Response,next: express.NextFunction) {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log(`Request time: ${getTime()}`);
  console.log(`Cookies: ${req.cookies}`);
  next();
}

router.post('/',function(req:express.Request,res: express.Response,next: express.NextFunction) {
  if (req.body.action === 'login') {
    getRepository(User).findOneOrFail({
      where: {
          password: req.body.password,
          email: req.body.email
      }
    }).then(user => {

        if (user) {
           res.json(userDTOMapper(user));
        }else res.json(false);

    }).catch(err => {
      res.json(false);
    });
  }

  next();
})

router.post('/',function(req:express.Request,res: express.Response,next: express.NextFunction){
  if (req.body.action === 'register') {
    const user = new User(req.body.firstName,req.body.lastName,req.body.email,req.body.password);
    getRepository(User).insert(user).then(value => {
      res.json(true);
    }).catch(err => {
      res.json(false);
    });
  }
})

export default router;



