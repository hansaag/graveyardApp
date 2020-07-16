export const cleanActivities = (activities) => {
  var activityList = Array(11);

  const keys = Object.keys(activities);
  let i = 0;
  for (let it in keys) {
    if (i > 1) activityList[i] = it;
    i++;
  }

  return activityList;
};

export default cleanActivities;
