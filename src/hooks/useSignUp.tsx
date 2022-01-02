interface IUser {
  userName?: HTMLInputElement | string;
  userPassword?: HTMLInputElement | string;
}

const useSignIn = () => {

  const initClevergramSession = (user: IUser) => {
    sessionStorage.setItem("clevergram", JSON.stringify(user));
  };

  return { initClevergramSession };
};

export default useSignIn;
