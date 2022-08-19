const jwt     = require("jsonwebtoken");
const jwtKey = 'moussestlepluscharismatique!!!!';


// Secure the node connection
exports.checkCookie = function (req, res, next) {
    try {
        // Pas de checkin pour certains paths
        let unautorizedPaths = [
            '/user/updateProfile',
            '/user/updateFavArticles',
            '/user/refresh',
            '/sub/check'
        ];
        if (!unautorizedPaths.includes(req.path)) {
            return next();
        }

        // Vérification du cookie
        const token = req.signedCookies.token;
        if (!token) {
            console.log('Token not found')
            return res.status(401).end();
        }
        var payload;
        try {
            payload = jwt.verify(token, jwtKey)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                // JWT is unauthorized 
                console.log('JWT is unauthorized')
                return res.status(401).end()
            }
            // Bad request error
            return res.status(400).end()
        }

        req.email = payload.profile.email;

        // console.log("Cookie décrypté : ", req.email);
        next();
    } catch (error) {
        console.error(error);
    }
}
