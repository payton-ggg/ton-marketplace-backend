export const calculateBalance = (incomeData, user) => {
  const AMOUNT = 50;
  let userBalance = user.balance;

  const increase = () => {
    userBalance += AMOUNT;
  };

  if (
    incomeData.isTelegramComplete &&
    incomeData.isTelegramComplete !== user.isTelegramComplete
  ) {
    increase();
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
