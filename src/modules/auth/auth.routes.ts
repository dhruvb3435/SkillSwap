import { Router } from 'express';
import { validateBody } from '../../utils/validate';
import { LoginSchema, RegisterSchema } from '../../schemas/dto';
import * as svc from './auth.service';

const router = Router();

router.post('/register', validateBody(RegisterSchema), async (req, res, next) => {
  try {
    const { email, password, name, skillsTeach, skillsLearn } = req.body;
    const result = await svc.register({ email, password, name, skillsTeach, skillsLearn });
    res.status(201).json(result);
  } catch (err) { next(err); }
});

router.post('/login', validateBody(LoginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await svc.login(email, password);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
