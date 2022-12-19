import { Router } from 'express';

import { UserController } from '../controller';
import { UserService } from '../service';
import { UserRepository } from '../repository';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.use('/api', userController.router)

export { router };