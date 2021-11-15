export const LoginForm = () => {
  const registerUser = (event) => {
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
  };

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="name">Username</label>
      <input id="name" type="text" autoComplete="name" required />
      <button type="submit">Login</button>
    </form>
  );
};
