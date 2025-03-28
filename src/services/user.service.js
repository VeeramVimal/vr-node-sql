// function userNameRandomGenerate(length) {
//     const characters = 'abcdefghijklmnopqrstuvwxyz';
//     let result = '';
//     for (let i = 0; i <= length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length))
//     }
//     return result;
// };

// function generateRandomString(key, length) {
//     let characters = 'abcdefghijklmnopqrstuvwxyz';
//     let result = '';

//     switch (key) {
//         case 'firstName':
//         case 'lastName':
//             characters = 'abcdefghijklmnopqrstuvwxyz';
//             break;
//         case 'email':
//             characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//             break;
//         case 'password':
//             characters = 'abcdefghijklmnopqrstuvwxyz0123456789@#$!*()';
//             break;
//         default:
//             characters = 'abcdefghijklmnopqrstuvwxyz';
//     }

//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// }
const generateRandomString = (keyOrLength, length) => {
    const charSets = {
        firstName: 'abcdefghijklmnopqrstuvwxyz',
        lastName: 'abcdefghijklmnopqrstuvwxyz',
        email: 'abcdefghijklmnopqrstuvwxyz0123456789',
        password: 'abcdefghijklmnopqrstuvwxyz0123456789@#$!*()'
    };

    if (typeof keyOrLength === 'number') {
        length = keyOrLength;
        keyOrLength = 'firstName';
    }
    const characters = charSets[keyOrLength] || 'abcdefghijklmnopqrstuvwxyz';
    length = Math.max(1, length || 5);
    return [...Array(length)].map(() => characters[Math.floor(Math.random() * characters.length)]).join('');
};

function userEmailRandomGenerate() {
    const userEmail = generateRandomString('email', 8);
    const domains = ['example.com', 'test.com', 'sample.org'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${userEmail}@${domain}`;
}

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateRandomMobileNo = () => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    return {
        country: randomCountry.name,
        countryCode: randomCountry.code,
        mobileNumberCode: `${randomCountry.code} ${generateRandomNumber(100000000, 999999999)}`,
        address: addressGenerate(randomCountry.code),
    };
};

const addressGenerate = (code) => {
    // let street, city, state, zip, pin, postcode, province, prefecture

    // switch (code) {
    //     case '+1':
    //         street = `${Math.floor(Math.random() * 10000)} ${generateRandomString(5)} St`;
    //         city = generateRandomString(6);
    //         state = generateRandomString(2).toUpperCase();
    //         zip = Math.floor(Math.random() * 90000 + 10000);
    //         return `${street}, ${city}, ${state} ${zip}`;

    //     case '+91':
    //         street = `${Math.floor(Math.random() * 100)} ${generateRandomString(5)} Nagar`;
    //         city = generateRandomString(6);
    //         state = generateRandomString(6);
    //         pin = Math.floor(Math.random() * 900000 + 100000);
    //         return `${street}, ${city}, ${state}, ${pin}`;

    //     case '+44':
    //         street = `${Math.floor(Math.random() * 100)} ${generateRandomString(5)} Road`;
    //         city = generateRandomString(6);
    //         postcode = generateRandomString(3).toUpperCase() + ' ' + Math.floor(Math.random() * 100);
    //         return `${street}, ${city}, ${postcode}`;

    //     case '+61':
    //         street = `${Math.floor(Math.random() * 1000)} ${generateRandomString(5)} Ave`;
    //         city = generateRandomString(6);
    //         state = generateRandomString(3).toUpperCase();
    //         postcode = Math.floor(Math.random() * 9000 + 1000);
    //         return `${street}, ${city}, ${state} ${postcode}`;

    //     case '+81':
    //         street = `${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 100)} ${generateRandomString(5)}-cho`;
    //         city = generateRandomString(6);
    //         prefecture = generateRandomString(3);
    //         postcode = Math.floor(Math.random() * 900 + 100) + '-' + Math.floor(Math.random() * 9000 + 1000);
    //         return `${postcode} ${prefecture}, ${city}, ${street}`;

    //     case '+86':
    //         street = `${Math.floor(Math.random() * 100)} ${generateRandomString(5)} Lu`;
    //         city = generateRandomString(6);
    //         province = generateRandomString(3);
    //         postcode = Math.floor(Math.random() * 900000 + 100000);
    //         return `${city}, ${province}, ${street}, ${postcode}`;

    //     case '+33':
    //         street = `${Math.floor(Math.random() * 100)} ${generateRandomString(5)} Rue`;
    //         city = generateRandomString(6);
    //         postcode = Math.floor(Math.random() * 90000 + 10000);
    //         return `${street}, ${postcode} ${city}`;

    //     case '+49':
    //         street = `${generateRandomString(5)}straße ${Math.floor(Math.random() * 100)}`;
    //         city = generateRandomString(6);
    //         postcode = Math.floor(Math.random() * 90000 + 10000);
    //         return `${street}, ${postcode} ${city}`;

    //     case '+39':
    //         street = `${generateRandomString(5)} Via ${Math.floor(Math.random() * 100)}`;
    //         city = generateRandomString(6);
    //         postcode = Math.floor(Math.random() * 90000 + 10000);
    //         return `${street}, ${postcode} ${city}`;

    //     case '+55':
    //         street = `${generateRandomString(5)} Rua, ${Math.floor(Math.random() * 1000)}`;
    //         city = generateRandomString(6);
    //         state = generateRandomString(2).toUpperCase();
    //         postcode = Math.floor(Math.random() * 90000 + 10000) + '-' + Math.floor(Math.random() * 999);
    //         return `${street}, ${city}-${state}, ${postcode}`;

    //     default:
    //         return 'Unknown country code';
    // }

    const formats = {
        "+1": () => `${generateRandomNumber(1000, 9999)} ${generateRandomString(5)} St, ${generateRandomString(6)}, ${generateRandomString(2)}, ${generateRandomNumber(10000, 99999)}`,
        "+91": () => `${generateRandomNumber(10, 99)} ${generateRandomString(5)} Nagar, ${generateRandomString(6)}, ${generateRandomString(6)}, ${generateRandomNumber(100000, 999999)}`,
        "+44": () => `${generateRandomNumber(10, 99)} ${generateRandomString(5)} Road, ${generateRandomString(6)}, ${generateRandomString(3)} ${generateRandomNumber(10, 99)}`,
        "+61": () => `${generateRandomNumber(100, 999)} ${generateRandomString(5)} Ave, ${generateRandomString(6)}, ${generateRandomString(3)}, ${generateRandomNumber(1000, 9999)}`,
        "+81": () => `${generateRandomNumber(10, 99)}-${generateRandomNumber(10, 99)} ${generateRandomString(5)}-cho, ${generateRandomString(6)}, ${generateRandomString(3)}, ${generateRandomNumber(100, 999)}-${generateRandomNumber(1000, 9999)}`,
        "+86": () => `${generateRandomString(6)}, ${generateRandomString(3)}, ${generateRandomNumber(10, 99)} ${generateRandomString(5)} Lu, ${generateRandomNumber(100000, 999999)}`,
        "+33": () => `${generateRandomNumber(10, 99)} ${generateRandomString(5)} Rue, ${generateRandomNumber(10000, 99999)} ${generateRandomString(6)}`,
        "+49": () => `${generateRandomString(5)}straße ${generateRandomNumber(10, 99)}, ${generateRandomNumber(10000, 99999)} ${generateRandomString(6)}`,
        "+39": () => `${generateRandomString(5)} Via ${generateRandomNumber(10, 99)}, ${generateRandomNumber(10000, 99999)} ${generateRandomString(6)}`,
        "+55": () => `${generateRandomString(5)} Rua, ${generateRandomNumber(100, 999)}, ${generateRandomString(6)}-${generateRandomString(2)}, ${generateRandomNumber(10000, 99999)}-${generateRandomNumber(100, 999)}`,
    };

    return formats[code] ? formats[code]() : "Unknown country code";
}
const countries = [
    { name: "United States", code: "+1" },
    { name: "India", code: "+91" },
    { name: "United Kingdom", code: "+44" },
    { name: "Australia", code: "+61" },
    { name: "Japan", code: "+81" },
    { name: "China", code: "+86" },
    { name: "France", code: "+33" },
    { name: "Germany", code: "+49" },
    { name: "Italy", code: "+39" },
    { name: "Brazil", code: "+55" },
];


// function generateRandomMobileNo() {
//     const randomCountry = countries[Math.floor(Math.random() * countries.length)];
//     const mobileNumber = Math.floor(Math.random() * 900000000 + 100000000).toString();
//     const addressFormat = addressGenerate(randomCountry.code);
//     return {
//         country: randomCountry.name,
//         countryCode: randomCountry.code,
//         mobileNumberCode: `${randomCountry.code} ${mobileNumber}`,
//         address: addressFormat
//     }
// }

function generateRandomFields() {
    const Genders = ['Male', 'Female'];
    const qualifications = ['UG', 'PG', 'PhD'];
    const designations = [
        "Software Engineer",
        "Project Manager",
        "UX Designer",
        "HR Manager",
        "Financial Analyst",
        "Product Manager",
        "DevOps Engineer",
        "Quality Assurance Tester",
        "Sales Executive",
        "Customer Support Representative",
        "Content Writer",
        "Graphic Designer",
        "Network Administrator"
    ];

    let age = null;
    if (age <= 18 || age >= 80) {
        age = Math.floor(Math.random() * 100);
    }

    let randomIndex = Math.floor(Math.random() * Genders.length);
    let qualifyIndex = Math.floor(Math.random() * qualifications.length);
    let desigIndex = Math.floor(Math.random() * designations.length);
    return {
        age,
        gender: Genders[randomIndex],
        qualification: qualifications[qualifyIndex],
        designation: designations[desigIndex]
    };
}
module.exports = {
    // userNameRandomGenerate,
    userEmailRandomGenerate,
    generateRandomMobileNo,
    generateRandomString,
    generateRandomFields,
} 