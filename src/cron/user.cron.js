const cron = require("node-cron");
const userServices = require("../services/user.service");
const { User } = require("../model");
const asyncLib = require('async');
const os = require('os');

const cpuCores = os.cpus().length;
let isCheckRunning = false;
let batchSize = 100;
let totalJobProcessed = 0;
let counter = 0

const jobQueue = asyncLib.queue(async (task) => {
  
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    // const userData = await User.bulkCreate([task]);
    const userData = await User.create(task);
    if (userData) {
      totalJobProcessed++;

      console.log("userData bulk data created successfully", totalJobProcessed);
      // logQueuefunction();
      counter = 0;
    } else {
      console.error('something wend wrong user job');
      totalJobProcessed = 0;
    }
  } catch (error) {
    console.error('job failed err: ', error);
  } finally {
    logQueuefunction()
  }
}, cpuCores);

const generateRandomUser = async () => {
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
  counter++;
  return userBody;
}
const addToQueue = (users) => {
  jobQueue.push(users, (err) => {
    if (err) {
      console.error('User queue job failed:', err);
      return;
    }
  })
}
const userCreatedAutomatic = async (count = 10) => {
  try {
    const users = await Promise.all(Array.from({ length: count }, () => generateRandomUser()))
    if (!users || users.length === 0) { throw new Error('No users generated') };
    console.log("users.length===========", users.length, 'counter', counter);
    let usersArr = []
    for (let i = 0; i < users.length; i += batchSize) {
      const userBatch = users.slice(i, i + batchSize);
      // console.log("userBatch=========", userBatch);
      addToQueue(userBatch);
      if (counter === batchSize) {
        
        // jobQueue.push(userBatch, (err) => {
        //   if (err) {
        //     console.error('User queue job failed:', err);
        //     return;
        //   }
        // })

        console.log(`📩 Pushed batch of ${userBatch.length} users to queue`);
      } else if (counter > batchSize) {
        counter = 0;
      }
    }
    // const userData = await User.create(userBody);
    // return res.status(200).json({ user: userData, message: 'User create successfully' });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

const logQueuefunction = () => {
  console.log(`Running Jobs: ${jobQueue.running()}`);
  console.log(`Jobs Waiting in Queue: ${jobQueue.length()}`);
  console.log(`Total Jobs Processed: ${totalJobProcessed}`);

}

jobQueue.drain(() => console.log('Successfully processed all user details created'))
console.log(`Did the queue start ? ${jobQueue.started}`);

cron.schedule("* * * * *", async (req, res) => {
  if (isCheckRunning) return true;
  isCheckRunning = true;
  await userCreatedAutomatic(batchSize);
  isCheckRunning = false;
})

