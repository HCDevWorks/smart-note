import AuthController from '@/controllers/AuthController';
import verifyToken, {
  AuthenticatedRequest,
} from '@/middlewares/AuthMiddleware';
import { Response, Router } from 'express';

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Auth routes
const authController = new AuthController(supabaseUrl!, supabaseKey!);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

router.get(
  '/teste-token',
  verifyToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ message: 'Access Granted!', user: req.user });
  },
);

export default router;
