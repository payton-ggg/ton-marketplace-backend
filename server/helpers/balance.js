export const calculateBalance = (incomeData, user) => {
  const AMOUNT = 30;
  let userBalance = user.balance;

  const increase = () => {
    userBalance += AMOUNT;
  };

  const increaseSec = () => {
    userBalance += 40;
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
    incomeData.isMessComplete &&
    incomeData.isMessComplete !== user.isMessComplete
  ) {
    increase();
  } else if (
    incomeData.isWalComplete &&
    incomeData.isWalComplete !== user.isWalComplete
  ) {
    increase();
  } else {
    return userBalance;
  }

  return userBalance;
};
