import { Router } from 'express';
import User from '../users/user.model';

const router = Router();

// Simple matcher: find users who can teach X and want to learn Y
router.get('/', async (req, res, next) => {
  try {
    const teach = (req.query.teach as string | undefined) || undefined;
    const learn = (req.query.learn as string | undefined) || undefined;

    const query: any = {};
    if (teach) query.skillsTeach = new RegExp(teach, 'i');
    if (learn) query.skillsLearn = new RegExp(learn, 'i');

    const results = await User.find(query).limit(50);
    res.json(results);
  } catch (err) { next(err); }
});

export default router;
