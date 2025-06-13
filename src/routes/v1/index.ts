import { Router } from "express";

import postRoutes from "./posts.route";


const router = Router();

router.use('/posts', postRoutes);

export default router;