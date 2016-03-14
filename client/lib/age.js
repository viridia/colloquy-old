// Return the age of a post in 'humanized' form, such as 1s, 2m, etc.
// Rounds up to the next time unit if close to the threshold, e.g. 50 seconds
// prints as '1m'.
humanizedAge = function(date, opt_now) {
  var now = opt_now || new Date();
  if (!date) {
    return 'a while ago';
  }
  const ms = now - date;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 50) {
    return seconds + 's';
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 50) {
    return minutes + 'm';
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 23) {
    return hours + 'h';
  }
  const days = Math.floor(hours / 24);
  if (days < 25) {
    return days + 'd';
  }
  const months = Math.floor(days / 30);
  if (months < 10) {
    return months + 'mo';
  }
  const years = Math.floor(days / 365);
  return years + 'y';
}

export { humanizedAge };
