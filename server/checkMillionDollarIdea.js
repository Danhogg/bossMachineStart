/* This is middleware that will check if an idea is worth a million dollars or if the inputs
are of the right type. If the inputs are of the wrong type or the idea is not worth 
one million dollars then an error is thrown. Otherwise next is passed and is carries on
*/

const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body
    const totalRevenue = Number(numWeeks) * Number(weeklyRevenue)
    if (totalRevenue < 1000000 || !numWeeks || !weeklyRevenue || isNaN(totalRevenue)) {
        res.status(400).send()
    }
    else {
        next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
