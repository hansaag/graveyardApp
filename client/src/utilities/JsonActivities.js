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
  console.log(activityList);
  return activityList;
};

export const findTimeDiff = (item) => {
  if (item == null) return "--";
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
  console.log(today.getTime());
  console.log(activityDate.getTime());

  return Difference_In_Days;
};
