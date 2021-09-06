const express = require('express');
const path = require('path');
const data = require('./sampleData/data');

console.log(data.length)

const app = express();

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));


app.get('/api/buildings', async (req, res, next) => {
    res.send(await Building.findAll(
        { include: Violation }
    ))
});


const { Sequelize, STRING } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:fullstack25@localhost/ecb_violations', { logging: false });

//Models
const Tracker = db.define('tracker', {
    buildingId: {
        type: STRING,
        unique: true
    }
})

const Building = db.define('building', {
    identifier: {
        type: STRING,
        unique: true
    }
})

const Violation = db.define('violation', {
    isn_dob_bis_extract: STRING,
    ecb_violation_number: STRING,
    ecb_violation_status: STRING,
    dob_violation_number: STRING,
    bin: STRING,
    boro: STRING,
    block: STRING,
    lot: STRING,
    hearing_date: STRING,
    hearing_time: STRING,
    served_date: STRING,
    issue_date: STRING,
    severity: STRING,
    violation_type: STRING,
    respondent_name: STRING,
    respondent_house_number: STRING,
    respondent_street: STRING,
    respondent_city: STRING,
    respondent_zip: STRING,
    violation_description: STRING,
    penality_imposed: STRING,
    amount_paid: STRING,
    balance_due: STRING,
    infraction_code1: STRING,
    section_law_description1: STRING,
    aggravated_level: STRING,
    hearing_status: STRING,
    certification_status: STRING
});


//Associations
Building.hasMany(Violation, { sourceKey: 'identifier', foreignKey: 'bin' });
Violation.belongsTo(Building, { targetKey: 'identifier', foreignKey: 'bin' });


const syncAndSeed = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true })
        console.log('Connected to database');

        await Tracker.create({ buildingId: "1037166" })

        const buildingId = [...new Set(data.map(id => id['bin']))]; //Get unique building id from the violations data.
        await Promise.all(buildingId.map(id => Building.create({ identifier: id })));//Create all buildings using unique building id.
        await Promise.all(data.map(violation => Violation.create(violation))); //Create all violatioins
    }
    catch (err) {
        console.log(err);
    }
}

const runServer = async () => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`server running on port ${port}`));
    }
    catch (error) {
        console.log(error)
    }
}

runServer();


// 1037166
// 1088591