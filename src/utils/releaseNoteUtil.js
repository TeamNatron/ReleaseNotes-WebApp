export const classifyReleaseNote = note => {
  const { title, ingress, description } = note;
  const [hasTitle, hasIngress, hasDescription] = [
    hasText(title),
    hasText(ingress),
    hasText(description)
  ];

  if (!hasDescription) return; // there should always be a description
  if (!hasIngress && !hasTitle) {
    return "DENSE";
  } else return "FULL";
};

// empty html tag | empty string
const isEmptyRegEx = /<[^/][^>]*><\/[^>]+>|^$/;
const hasText = str => {
  return !(str ? isEmptyRegEx.test(str) : true);
};
