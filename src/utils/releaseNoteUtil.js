export const classifyReleaseNote = (note) => {
  const { title, ingress, description } = note;
  const [hasTitle, hasIngress] = [
    title && title.length > 0,
    ingress && ingress.length > 0,
    description && description.length > 0,
  ];
  if (!hasIngress && !hasTitle) {
    return "DENSE";
  } else return "FULL";
};
