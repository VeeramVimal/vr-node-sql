const { User } = require("../model");
const userServices = require("../services/user.service");
const cron = require("node-cron");

let isCheckRunning = false;
let isInterRunning = false;
let cronTask = null;
let intervalTask = null;
const CreateUser = async (req, res) => {
    try {
        if (cronTask) {
            return res.status(400).json({ message: "Cron job is already running." });
        }
        cronTask = cron.schedule("* * * * *", async () => {
            if (isCheckRunning) return;
            isCheckRunning = true;
            try {
                // await CreateUser({ body: {}}, { status: () => {}})
                await CreateUserAutomatically(); // Fake req & res for cron
            } catch (error) {
                console.error("Error in cron job:", error);
            } finally {
                isCheckRunning = false;
            }
        });
        console.log("Cron job started!");
        console.log("Cron job started, running every second...");
        return res.status(200).json({ message: "Cron job started successfully!" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const StopUserCron = (req, res) => {
    try {
        if (!cronTask) {
            return res.status(400).json({ message: "No cron job is running." });
        }
        cronTask.stop();
        cronTask = null;
        console.log("Cron job stopped.");
        return res.status(200).json({ message: "Cron job stopped successfully!" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const CreateUserInterval = async (req, res) => {
    try {
        if (intervalTask) {
            return res.status(400).json({ message: "Interval job is already running." });
        }
        intervalTask = setInterval(async () => {
            if (isInterRunning) return
            isInterRunning = true;
            try {
                await CreateUserAutomatically(); // Fake req & res for cron
            } catch (error) {
                console.error("Error in interval job:", error);

            } finally {
                isInterRunning = false
            }
        }, 100)
        console.log("Cron job started!");
        console.log("Cron job started, running every second...");
        return res.status(200).json({ message: "Cron job started successfully!" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const StopUserInterval = async (req, res) => {
    try {
        console.log("a,jdsfkasjfdlasf,,,, StopUserInterval");

        if (!intervalTask) {
            return res.status(400).json({ message: "No interval job is running." });
        }
        clearInterval(intervalTask);
        intervalTask = null;
        console.log("Interval job stopped.");
        return res.status(200).json({ message: "Interval job stopped successfully!" });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
const CreateUserAutomatically = async () => {
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
    await User.create(userBody);
}

const CreateUserManual = async (req, res) => {
    try {
        const userBody = req.body;
        console.log("userBody===========", userBody);
        const userData = await User.create(userBody);
        return res.status(200).json({ message: 'user create successfully!', data: userData })
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {
    CreateUser,
    StopUserCron,
    CreateUserInterval,
    StopUserInterval,
    CreateUserManual,
}