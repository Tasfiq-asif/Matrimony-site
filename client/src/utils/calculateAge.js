

const calculateAge = (dob) => {
    const today = new Date()
    const birthday = new Date(dob)

    let age = today.getFullYear() - birthday.getFullYear()
    const monthdiff = today.getMonth() - birthday.getMonth()
    const daydiff = today.getDate - birthday.getDate();

    if ((monthdiff < 0) || (monthdiff === 0 && daydiff< 0)) {
        age--
    }

    return age +1
};

export default calculateAge;