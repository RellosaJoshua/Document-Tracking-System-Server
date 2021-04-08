const { getAllDepartmentsQuery, getAllOfficesQuery } = require('./utils.service');

module.exports = {
    getAllDepartments: (req, res) => {
        getAllDepartmentsQuery((err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                }); 
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    },
    getAllOffices: (req, res) => {
        getAllOfficesQuery((err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                }); 
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}