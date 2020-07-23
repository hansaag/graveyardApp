export const cleanActivities = (activities) => {
  var activityList = Array(11);

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
  console.log(activityList);
  return activityList;
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
  //not accurate enough
  var Difference_Months = (today.getMonth() + 1 - activityDate.getMonth()) * 30;
  var Difference_In_Days =
    Difference_Months + (today.getDate() - activityDate.getDate());

  return Difference_In_Days;
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

  let date;
  let day = currentDate.getUTCDay();
  let month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  if ((year % 4 == 0 && year % 100 !== 0) || year % 400 == 0) {
    months[1] = 29;
  }

  var presentableDates = new Array(10);

  for (let i = 0, e = 0, x = 0; i < 9; x++) {
    day = currentDate.getUTCDay() - e;
    date = currentDate.getDate() - x;

    if (month == 0) {
      year = year + 1;
      month = 12;
    }

    if (date == 0) date = months[month - 1];
    if (day == 0) {
      e = e - 5;
      x = x + 2;
      day = currentDate.getUTCDay() - e;
    }
    if (day == 6) {
      e = e - 1;
      x = x + 1;
      day = currentDate.getUTCDay() - e;
    }

    if (i == 0) {
      presentableDates[i++] = "I dag (" + date + ". " + monthNames[month] + ")";
    } else {
      presentableDates[i++] =
        weekdays[day] + " (" + date + ". " + monthNames[month] + ")";
    }

    e++;
  }
  console.log(presentableDates);

  return presentableDates;
};
