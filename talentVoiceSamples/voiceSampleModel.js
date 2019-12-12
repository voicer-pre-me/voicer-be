const db = require('../data/dbConfig.js');

const addVoiceSample = async sample => {
    return await db('talentVoiceSamples').insert(sample);
};

const updateVoiceSample = async (userId, newSample) => {
    try {
        const checkForSample = await db('talentVoiceSamples').where({ userId });
        if (!checkForSample) return null;

        const updatedSample = await db('talentVoiceSamples')
            .where({ userId })
            .update(newSample);
        if (!updatedSample) return null;

        const selectUpdatedSample = await db('talentVoiceSamples').where({ userId });
        if (!selectUpdatedSample) return null;

        return selectedUpdatedSample;
    } catch (err) {
        return err.message;
    }
};

const deleteVoiceSample = async userId => {
    try {
        const selectedSample = await db('talentVoiceSamples')
            .where({ userId })
            .first();
        if (!selectedSample) return null;

        const deletedSample = await db('talentVoiceSamples')
            .where({ userId })
            .del();
        if (!deletedSample) return null;

        return selectedProfile;
    } catch (err) {
        return err.message;
    }
};

const getVoiceSamples = () => {
    return db('talentVoiceSamples as vs')
        .join('users as u', 'u.userId', '=', 'vs.userId')
        .select(
            'vs.description',
            'vs.url',
            'u.userId'
        )
};

// FIX THIS ONE!
const getVoiceSampleById = async userId => {
    try {
        const selectedSample = await db('talentVoiceSamples')
            .where({ userId })
            .first();
        return selectedSample ? selectedSample : null;
    } catch {
        return null;
    }
};

const getVoiceSampleByUserId = async userId => {
    try {
        const selectedSamples = await db('users as u')
            .join('talentVoiceSamples as vs', 'u.userId', '=', 'vs.userId')
            .select(
                'vs.description',
                'vs.url',
                'u.userId'
            ).where({ userId: 'u.userId' });

            return selectedSample ? selectedSample : null;
    } catch {
        return null;
    }
};

module.exports = {
    addVoiceSample,
    updateVoiceSample,
    deleteVoiceSample,
    getVoiceSamples,
    getVoiceSampleById,
    getVoiceSampleByUserId
};