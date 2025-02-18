import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hola Mundo en Express / TypeScript");
});

router.get("/nosotros", (req, res) => {
  res.send("Nosotros");
});

router.get("/blog", (req, res) => {
  res.send("Blog");
});

export default router;
