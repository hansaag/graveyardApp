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

  var presentableDates = new Array(10);

  presentableDates[0] = "I dag" + currentDate.getUTCDate();
  let e = 1;
  for (let i = 1; i < 9; i--) {
    let day = currentDate.getUTCDay() - e;
    if (day < 0) {
      e = 6;
    }

    presentableDates[i] =
      weekdays[currentDate.getUTCDay() - e] +
      " (" +
      (currentDate.getUTCDate() - i).toString() +
      ")";
    e--;
  }
  console.log(presentableDates);

  return presentableDates;
};
