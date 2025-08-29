import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import * as service from './user.service';
import { UpdateUserSchema } from '../../schemas/dto';
import { validateBody } from '../../utils/validate';

const router = Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const me = await service.getById(req.user!.id);
    res.json(me);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const u = await service.getById(req.params.id);
    res.json(u);
  } catch (err) { next(err); }
});

router.put('/:id', requireAuth, validateBody(UpdateUserSchema), async (req, res, next) => {
  try {
    if (req.user!.id !== req.params.id) return next(Object.assign(new Error('Forbidden'), { status: 403 }));
    const u = await service.updateById(req.params.id, req.body);
    res.json(u);
  } catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try {
    if (req.query.skill) {
      const users = await service.searchBySkill(req.query.skill as string);
      return res.json(users);
    }
    if (req.query.name) {
      const users = await service.searchByName(req.query.name as string);
      return res.json(users);
    }
    const users = await service.searchBySkill(undefined);
    res.json(users);
  } catch (err) { next(err); }
});

export default router;
