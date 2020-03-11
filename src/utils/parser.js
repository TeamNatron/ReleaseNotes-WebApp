export const formatDate = dateString => {
  const date = new Date(dateString);

  const languageCode = "no-NB";

  const day = new Intl.DateTimeFormat(languageCode, { weekday: "long" }).format(
    date
  );
  const dayOfMonth = new Intl.DateTimeFormat(languageCode, {
    day: "numeric"
  }).format(date);
  const month = new Intl.DateTimeFormat(languageCode, { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat(languageCode, {
    year: "numeric"
  }).format(date);

  return stringWordsToUpperCase(
    day + " " + dayOfMonth + " " + month + " " + year
  );
};

const stringWordsToUpperCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
