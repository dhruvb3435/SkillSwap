import { Router } from 'express';
import { requireAuth } from '../../middleware/auth';
import { CreditTransferSchema } from '../../schemas/dto';
import { validateBody } from '../../utils/validate';
import * as svc from './credit.service';

const router = Router();

router.post('/transfer', requireAuth, validateBody(CreditTransferSchema), async (req, res, next) => {
  try {
    const { toUserId, amount } = req.body;
    const result = await svc.transferCredits(req.user!.id, toUserId, amount);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
