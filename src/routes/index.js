
const express = require("express");
const UserRoute = require("./user.route");
const router = express.Router();
const defaultRoute = [
    {
        path: '/user',
        route: UserRoute
    },
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.route)
})
module.exports = router;
