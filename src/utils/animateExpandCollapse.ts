const animateExpandCollapse = async (
  element: HTMLElement,
  direction: "expand" | "collapse",
  expandHeight: number,
): Promise<void> => {
  const keyFrames = [
    { maxBlockSize: `${expandHeight}px` },
    { maxBlockSize: 0 },
  ];

  if (direction == "expand") {
    keyFrames.reverse();
  }

  const animation = element.animate(keyFrames, {
    duration: 300,
    easing: "ease-in-out",
    fill: "forwards",
  });

  await animation.finished;

  animation.commitStyles();
};

export default animateExpandCollapse;
