export const calculateBalanceSec = (incomeData, user) => {
  const AMOUNT = 30;
  let userBalanceSec = user.balanceSec;

  const increase = () => {
    userBalanceSec += AMOUNT;
  };

  const increaseSec = () => {
    userBalanceSec += 40;
  };

  if (
    incomeData.isTelegramComplete &&
    incomeData.isTelegramComplete !== user.isTelegramComplete
  ) {
    increaseSec();
  } else if (
    incomeData.isXComplete &&
    incomeData.isXComplete !== user.isXComplete
  ) {
    increase();
  } else if (
    incomeData.isWalComplete &&
    incomeData.isWalComplete !== user.isWalComplete
  ) {
    increase();
  } else {
    return userBalanceSec;
  }

  return userBalanceSec;
};
