require('dotenv').config();
const express = require('express');
const app = express();
const { getCityInfo, getJobs } = require('./util'); // Correctly import the functions
const axios = require('axios');

// TODO: Statically serve the public folder
app.use(express.json());
app.use(express.static('./public'));

// TODO: declare the GET route /api/city/:city
app.route('/api/city/:city')
    .get(async (req, res) => {
        const { city } = req.params;
        try {
            // Call getCityInfo and getJobs and return the result as JSON.
            const cityInfo = await getCityInfo(city);
            const jobs = await getJobs(city);

            // If no city info or jobs are found, return a 404 status.
            if (!cityInfo || !jobs) {
                return res.status(404).json({ error: 'City info or jobs not found' });
            }

            res.json({ cityInfo, jobs });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

module.exports = app;