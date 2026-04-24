export const reasons = Array.from({ length: 100 }, (_, index) => ({
  number: index + 1,
  slug: `reason-${index + 1}`,
  title: `Reason ${index + 1}`,
  summary: "Content to be edited.",
  content:
    "This section is a placeholder. You can later replace it with a detailed reason, image, quote, or analysis.",
}));