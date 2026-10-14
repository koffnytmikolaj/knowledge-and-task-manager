export const Rules = {
  shouldTriggerAIForNote: (content: string) => {
    return content.trim().length > 50;
  },
};