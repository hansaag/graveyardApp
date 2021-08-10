/* This file contains a number of functions for setting values for activities
and calculating time and date for completed activities */

export const cleanActivities = (activities) => {
  var activityList = Array(6);

  let i = 0;
  let e = 0;

  for (let it in activities) {
    if (i > 1 && i < 8) {
      if (it) activityList[e++] = activities[it];
    }
    i++;
  }
  return activityList;
};

export const cleanGlobalActivities = (activities) => {
  var activityList = Array(4);

  let i = 0;
  for (let it in activities) {
    activityList[i++] = activities[it];
  }
  return activityList;
};

export const cleanProjects = (activities) => {
  var projectList = Array();
  let i = 0;
  for (let it in activities) {
    projectList.push(activities[it].project_title);
  }

  return projectList;
};

export const cleanComments = (comments) => {
  var commentList = Array();
  for (let it in comments) {
    commentList.push(comments[it].comment);
  }
};

export const findTimeDiff = (item) => {
  if (item == null) return "-";
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const stringDate = JSON.stringify(item);

  var activityDate = new Date();
  let year = parseInt(stringDate.substring(1, 5));
  let month = parseInt(stringDate.substring(6, 8));
  let day = parseInt(stringDate.substring(9, 11));
  activityDate.setFullYear(year);
  activityDate.setMonth(month);
  activityDate.setDate(day);

  let fullActivityDate = year + "-" + month + "-" + day;
  var Difference_Months = (today.getMonth() + 1 - activityDate.getMonth()) * 30;
  var Difference_In_Days =
    Difference_Months + (today.getDate() - activityDate.getDate()) - 1;

  if (fullActivityDate === date) return 0;
  else return Difference_In_Days;
};

export const returnDates = () => {
  var currentDate = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Søndag";
  weekdays[1] = "Mandag";
  weekdays[2] = "Tirsdag";
  weekdays[3] = "Onsdag";
  weekdays[4] = "Torsdag";
  weekdays[5] = "Fredag";
  weekdays[6] = "Lørdag";

  var months = new Array(12);
  months[0] = 31;
  months[1] = 28;
  months[2] = 31;
  months[3] = 30;
  months[4] = 31;
  months[5] = 30;
  months[6] = 31;
  months[7] = 31;
  months[8] = 30;
  months[9] = 31;
  months[10] = 30;
  months[11] = 31;

  var monthNames = new Array(12);
  monthNames[0] = "jan";
  monthNames[1] = "feb";
  monthNames[2] = "mars";
  monthNames[3] = "apr";
  monthNames[4] = "mai";
  monthNames[5] = "jun";
  monthNames[6] = "jul";
  monthNames[7] = "aug";
  monthNames[8] = "sept";
  monthNames[9] = "okt";
  monthNames[10] = "nov";
  monthNames[11] = "des";

  let date = currentDate.getDate();
  let day = currentDate.getUTCDay();
  let month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  if ((year % 4 == 0 && year % 100 !== 0) || year % 400 == 0) {
    months[1] = 29;
  }

  var presentableDates = new Array(10);
  for (let i = 0; i < 30; date--) {
    if (month == 0) {
      year = year + 1;
      month = 11;
      date = months[month];
    }

    if (date == 0) {
      month = month - 1;
      date = months[month - 1];
    }

    if (i == 0) {
      presentableDates[i++] = {
        display: "I dag (" + date + ". " + monthNames[month] + ")",
        dbValue: "" + year + "-" + (month + 1) + "-" + date,
      };
    } else {
      presentableDates[i++] = {
        display: weekdays[day] + " (" + date + ". " + monthNames[month] + ")",
        dbValue: "" + year + "-" + (month + 1) + "-" + date,
      };
    }

    day--;
    if (day < 0) day = 6;
  }

  return presentableDates;
};

export const lightDates = (fields, activity) => {
  console.log("lightdates called");
  return fields.map((f) => findTimeDiff(f[activity]));
};
