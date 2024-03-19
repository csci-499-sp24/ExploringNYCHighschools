import School from '../../../../server/models/school'; // Import your School model

export default async function handler(req, res) {
    const {dbn} = req.query;
    try {
        const school = await School.findOne({
            where: {
                dbn: dbn // Use the dbn parameter to search for the school
            }
        });
        if (!school) {
            return res.status(404).json({ error: 'School not found!' });
        }
        res.status(200).json({school});
    } catch (error) {
            console.error('Error fetching school:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
}