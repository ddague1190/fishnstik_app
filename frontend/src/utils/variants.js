export const pageVariants = {
  initial: {
    opacity: 0.5,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0.5
  },
};

export const fishingRodVariants = {
  start: {
    opacity: 0,
    translateX: 0
  },
  end: {
    translateX: 100,
    opacity: 1,
    transition: {duration: 1, delay: 1}
  },
};
