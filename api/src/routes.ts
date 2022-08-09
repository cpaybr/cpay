import { Router } from "express";
const router = Router();

import EnsureAuthenticated from "./services/middlewares/EnsureAuthenticated";
import EnsureAdminAuthenticated from "./services/middlewares/EnsureAdminAuthenticated";
import BusinessUnitController from "./controllers/BusinessUnitController";
import UserController from "./controllers/UserController";
import ClientController from "./controllers/ClientController";
import InvoiceController from "./controllers/InvoiceController";
import PixKeyController from "./controllers/PixKeyController";

router.get('/', async (request, response) => {
    response.status(200).json({ success: true, description: "Server is running" });
});

router.post('/businessUnit', EnsureAuthenticated, BusinessUnitController.create);
router.get('/businessUnit/:id', EnsureAuthenticated, BusinessUnitController.show);

router.post('/authentication/signin', UserController.signIn);
router.post('/authentication/signup', UserController.register);
router.get('/user/profile', EnsureAuthenticated, UserController.profile);
router.put('/user/profile', EnsureAuthenticated, UserController.update);
router.put('/user/profile/password', EnsureAuthenticated, UserController.updatePassword);

router.get('/users', EnsureAdminAuthenticated, UserController.index);
router.get('/users/:id', EnsureAdminAuthenticated, UserController.show);
router.post('/users', EnsureAdminAuthenticated, UserController.register);
router.put('/users/:id', EnsureAdminAuthenticated, UserController.update);
router.delete('/users/:id', EnsureAdminAuthenticated, UserController.delete);

router.get('/clients', EnsureAuthenticated, ClientController.index);
router.get('/clients/:id', EnsureAuthenticated, ClientController.show);
router.post('/clients', EnsureAuthenticated, ClientController.create);
router.put('/clients/:id', EnsureAuthenticated, ClientController.update);
router.delete('/clients/:id', EnsureAuthenticated, ClientController.delete);

router.get('/invoices', EnsureAuthenticated, InvoiceController.index);
router.get('/invoices/:id', EnsureAuthenticated, InvoiceController.show);
router.post('/invoices', EnsureAuthenticated, InvoiceController.create);

router.get('/pix/keys', EnsureAuthenticated, PixKeyController.index);
router.post('/pix/keys', EnsureAuthenticated, PixKeyController.create);
router.delete('/pix/keys/:type', EnsureAuthenticated, PixKeyController.delete);

export { router };
