import { Router } from "express";

// controllers
import loginController from "../controllers/ngo/ngoAuthnetication/loginController";
import removeAccountController from "../controllers/ngo/ngoAuthnetication/removeAccountController";
import stepOneController from "../controllers/ngo/ngoAuthnetication/signupController/stepOneController"
import stepTwoController from "../controllers/ngo/ngoAuthnetication/signupController/stepTwoController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";


// validator middlewares
import {loginValidator,ngoSignupTow,signupValidatorOne,} from "../../middleware/requestValidator";
import { ngoAuthorization } from "../../middleware";
import { getAcceptedRequestsController, getCompletedRequestsController, getPendingRequestsContorller, getSelectedRequest } from "../controllers/ngo/foodRequestManage/getRequestsController";
import { acceptRequestController, completeRequestController } from "../controllers/ngo/foodRequestManage/manageRequestsController";

const router = Router();

// POST signup
router.post("/register/stepone", signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id",ngoSignupTow,otpAuthMiddleware,stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

// GET get requests
router.get("/get/pending/requests",  getPendingRequestsContorller);
router.get("/get/accepted/requests",  getAcceptedRequestsController);
router.get("/get/completed/requests",  getCompletedRequestsController);

router.get("/get/seleted/request/:id",  getSelectedRequest);

// PATCH account
router.patch("/remove/account/:id", removeAccountController);

// PATCH requests
router.patch("/accept/request/:id", acceptRequestController)
router.patch("/complete/request/:id", completeRequestController);

export default router;
