const cron = require("node-cron");
const userServices = require("../services/user.service");
const { User } = require("../model");

let isCheckRunning = false;

const userCreatedAutomatic = async (req, res) => {
    try {
        const {
            generateRandomMobileNo,
            generateRandomFields,
            userEmailRandomGenerate,
            generateRandomString
        } = userServices;
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        const userFirstName = capitalizeFirstLetter(generateRandomString(5));
        const userLastName = capitalizeFirstLetter(generateRandomString(5));
        const { mobileNumberCode, address, country } = generateRandomMobileNo();
        const { qualification, designation } = generateRandomFields();

        const userBody = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmailRandomGenerate(),
            password: generateRandomString('password', 10),
            mobile_no: mobileNumberCode,
            age: Math.floor(Math.random() * 70) + 18,
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            qualification,
            designation,
            address,
            country,
            profile_picture: ""
        };
        if (!userBody) { throw new Error('something went wrong') }
        const userData = await User.create(userBody);
        return res.status(200).json({ user: userData, message: 'User create successfully' });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
cron.schedule("* * * * *", async (req, res) => {
    if (isCheckRunning) return true;
    isCheckRunning = true;
    await userCreatedAutomatic(req, res);
    isCheckRunning = false;
})
