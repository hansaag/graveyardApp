export const cleanActivities = (activities) => {
  var activityList = Array(11);

  let i = 0;
  let e = 0;
  for (let it in activities) {
    if (i > 1) {
      activityList[e++] = it;
    }
    i++;
  }
  console.log(activityList);
  return activityList;
};

export default cleanActivities;
