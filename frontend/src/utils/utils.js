export const saveTokenLocalStorage = (tokenDetails) => {
  localStorage.setItem("userInfor", JSON.stringify(tokenDetails));
  localStorage.setItem("auth", JSON.stringify(tokenDetails));
};