/*const isAuthenticated = (req, res, next) => {
                if (req.session.user === undefined){
                                return res.status(401).json('You do not have access');
                }
                next();
};

*/





const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }
    next();
};

module.exports = {
                isAuthenticated
}