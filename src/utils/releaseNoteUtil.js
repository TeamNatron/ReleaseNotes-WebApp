export const classifyReleaseNote = note => {
  const { title, ingress, description } = note;
  const [hasTitle, hasIngress, hasDescription] = [
    title && title.length > 0,
    ingress && ingress.length > 0,
    hasText(description)
  ];
  if (!hasDescription) return "NO-DESCRIPTION"; // there should always be a description
  if (!hasIngress && !hasTitle) {
    return "DENSE";
  } else return "FULL";
};

/**
 * check if html string has content
 * @param {string} str the html string
 */
const hasText = str => {
  if (str === "" || !str) return false;
  const aux = document.createElement("div");
  aux.innerHTML = str; //parses the html

  var hasText = false;
  aux.childNodes.forEach(child => {
    if (child.innerHTML?.trim().length > 0) {
      hasText = true;
    }
    if (child.nodeName === "IMG") {
      hasText = true;
    }
    if (child.TEXT_NODE) {
      if (child.textContent.length > 0) hasText = true;
    }
  });
  return hasText;
};
