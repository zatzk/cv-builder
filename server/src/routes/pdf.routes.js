import express from "express";
const router = express.Router();
import { generatePDF } from '../controllers/pdf.controller.js';


// PDF Generation Endpoint
router.post("/generate", generatePDF);

export default router;