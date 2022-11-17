export const generateUUID = (): string => `${(Math.random() + 1).toString(36).substring(6)}-${Date.now()}`;
