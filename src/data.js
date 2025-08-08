export const api_key = "AIzaSyAtCWa2cU6oIivOdr4LXg27ILAv-0tbHNw";

export const valueConverter = (value) => {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  }
  return value;
};
