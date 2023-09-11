const express = require('express');
const classifiedRouter = express.Router();
const { ClassifiedModel } = require('../models/classified.model');

classifiedRouter.post('/', async (req, res) => {
    try {
        const classified = new ClassifiedModel(req.body);
        await classified.save();
        res.status(201).json(classified);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

classifiedRouter.get('/', async (req, res) => {
    try {
        const classifieds = await ClassifiedModel.find();
        res.status(200).json(classifieds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

classifiedRouter.put('/:id', async (req, res) => {
    try {
        const updatedClassified = await ClassifiedModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedClassified);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

classifiedRouter.delete('/:id', async (req, res) => {
    try {
        await ClassifiedModel.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { classifiedRouter };
