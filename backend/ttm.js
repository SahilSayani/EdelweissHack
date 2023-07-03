const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
};
function getDayDifference(expiryDate, currentDate) {
    const timeString = "15:30";
    const day = expiryDate.slice(0, 2);
    const month = monthMap[expiryDate.slice(2, 5)];
    const year = `20${expiryDate.slice(5)}`;
    const isoDateString = `${year}-${month}-${day}T${timeString}:00Z`;
    const date1 = new Date(isoDateString);
    const date2 = new Date(currentDate);
    console.log(date1, date2);
    const dayStart = new Date(currentDate);
    dayStart.setUTCHours(9);
    dayStart.setUTCMinutes(15);
    dayStart.setUTCSeconds(0);
    dayStart.setUTCMilliseconds(0);
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCHours(15);
    dayEnd.setUTCMinutes(30);
    var todayDiff =
        (date2.getTime() - dayStart.getTime()) /
        (dayEnd.getTime() - dayStart.getTime());
    if (date2 > dayEnd) todayDiff = 0;
    const timeDiff = date1.getTime() - date2.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff + todayDiff;
}
const expiryDate = "12Aug23";
const currentDate = new Date();
currentDate.setUTCHours(currentDate.getUTCHours() + 5);
currentDate.setUTCMinutes(currentDate.getUTCMinutes() + 30);
const difference = getDayDifference(expiryDate, currentDate);
console.log(difference);
