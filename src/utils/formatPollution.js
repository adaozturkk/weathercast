export function formatPollution(index) {
  let pollution = "";
  switch (index) {
    case 1:
      pollution = "Good";
      break;
    case 2:
      pollution = "Fair";
      break;
    case 3:
      pollution = "Moderate";
      break;
    case 4:
      pollution = "Poor";
      break;
    case 5:
      pollution = "Very Poor";
      break;
    default:
      pollution = "Unavailable";
      break;
  }
  return pollution;
}
