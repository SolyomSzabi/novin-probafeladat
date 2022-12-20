import { Router } from 'express';

import { UserController } from '../controller';
import { CustomerService, ItemService, UserService } from '../service';
import { CustomerRepository, ItemRepository, UserRepository } from '../repository';
import { ItemController } from '../controller/itemController';
import { CustomerController } from '../controller/customerController';
import { AuthenticationController } from '../controller/authController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService);
const userController = new UserController(userService);

router.use('/api', userController.router);

const authenticationController = new AuthenticationController(authMiddleware);

router.use('/auth', authenticationController.router);

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

router.use('/api', itemController.router);

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

router.use('/api', customerController.router);

export { router };