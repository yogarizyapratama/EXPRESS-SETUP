import router from "express";

const apiRoute = router();

apiRoute.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

export { apiRoute };