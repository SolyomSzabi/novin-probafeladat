import { Router } from 'express';

import { UserController } from '../controller';
import { CustomerService, ItemService, UserService } from '../service';
import { CustomerRepository, ItemRepository, UserRepository } from '../repository';
import { ItemController } from '../controller/itemController';
import { CustomerController } from '../controller/customerController';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.use('/api', userController.router);

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

router.use('/api', itemController.router);

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

router.use('/api', customerController.router);

export { router };