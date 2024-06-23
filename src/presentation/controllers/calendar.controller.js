const express = require('express');
const getByIdCalendarEventCommandHandler = require('../../application/features/calendar/query/getByIdCalendarEvent.query');
const getAllCalendarEventsCommandHandler = require('../../application/features/calendar/query/getAllCalendarEvents.query');
const createCalendarEventCommandHandler = require('../../application/features/calendar/command/createCalendarEvent.command');
const updateCalendarEventCommandHandler = require('../../application/features/calendar/command/updateCalendarEvents.command');
const deleteCalendarEventsCommandHandler = require('../../application/features/calendar/command/deleteCalendarEvents.command');

const getCalendarEvents = async (
  req = express.request,
  res = express.response
) => {
  const resp = await getAllCalendarEventsCommandHandler({});
  if (!resp.isValid) {
    return res.status(400).send({ ok: false, message: resp.message });
  }
  res.status(201).send({ ok: true, message: resp.message, data: resp.data });
};

const getCalendarEvent = async (
  req = express.request,
  res = express.response
) => {
  const {
    params: { eventId },
  } = req;

  const resp = await getByIdCalendarEventCommandHandler({});
  if (!resp.isValid) {
    return res.status(400).send({ ok: false, message: resp.message });
  }
  res.status(201).send({ ok: true, message: resp.message, data: resp.data });
};

const createCalendarEvent = async (
  req = express.request,
  res = express.response
) => {
  const {
    body: { title, notes, start, end },
    params,
    query,
    uid,
  } = req;
  const resp = await createCalendarEventCommandHandler({
    title,
    notes,
    start,
    end,
    userId: uid,
  });
  if (!resp.isValid) {
    return res.status(400).send({ ok: false, message: resp.message });
  }
  res.status(201).send({ ok: true, message: resp.message, data: resp.data });
};

const updateCalendarEvent = async (
  req = express.request,
  res = express.response
) => {
  const {
    body: { title, notes, start, end },
    params: { eventId },
    query,
    uid,
  } = req;
  const resp = await updateCalendarEventCommandHandler({
    eventId,
    title,
    notes,
    start,
    end,
    userId: uid,
  });
  if (!resp.isValid) {
    return res.status(400).send({ ok: false, message: resp.message });
  }
  res.status(201).send({ ok: true, message: resp.message, data: resp.data });
};

const deleteCalendarEvent = async (
  req = express.request,
  res = express.response
) => {
  const {
    params: { eventId },
    uid,
  } = req;

  const resp = await deleteCalendarEventsCommandHandler({
    eventId,
    userId: uid,
  });
  if (!resp.isValid) {
    return res.status(400).send({ ok: false, message: resp.message });
  }
  res.status(201).send({ ok: true, message: resp.message, data: resp.data });
};

module.exports = {
  getCalendarEvents,
  getCalendarEvent,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
};
