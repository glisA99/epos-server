import * as express from 'express';
import { getRepository } from 'typeorm';
import { resolveModuleName } from 'typescript';
import { Team } from '../src/entity/Team';
import { User } from '../src/entity/User';

const router = express.Router();

interface teamDTO {
  naziv: string
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  const users = await getRepository(User).find();
  res.json(users);

});
async function getUserTeams(id: string) {

  const user:User | undefined = await getRepository(User).findOne(id,{
  });
  if (user !== undefined) {
    return user.teams;
  }

}

router.get('/:id/teams', async function(req:express.Request,res: express.Response,next: express.NextFunction) {

  const userID = req.params.id;
  const user = await getRepository(User).findOne(userID);
  const teams=user.teams;
  if (teams) {
    res.json(teams);
    res.send();
  }else {
    res.json({ status: 'not found' });
    res.send();
  }

})

router.post('/:id/teams', async function(req:express.Request,res: express.Response,next: express.NextFunction) {

  const userID = req.params.id;
  const team:teamDTO = req.body;
  
  const user:User | undefined = await getRepository(User).findOne(userID);
  if (user !== undefined) {
    await getRepository(Team).insert({
      naziv:team.naziv
    });

    /* user.teams.push(new Team(team.naziv, [user]));
    await getRepository(User).save(user); */
    res.sendStatus(200);
    res.send();
  }else {
    res.json({ status: 'not found' });
  }

})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something went wrong!');
})


module.exports = router;
