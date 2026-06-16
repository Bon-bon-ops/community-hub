const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");
const { requireAuth } = require("../middleware/auth");

router.get("/", eventsController.getAllEvents);
router.get("/new", requireAuth, eventsController.getNewEvent);
router.post("/", requireAuth, eventsController.createEvent);
router.get("/:id", eventsController.getEvent);
router.get("/:id/edit", requireAuth, eventsController.getEditEvent);
router.put("/:id", requireAuth, eventsController.updateEvent);
router.delete("/:id", requireAuth, eventsController.deleteEvent);

module.exports = router;
