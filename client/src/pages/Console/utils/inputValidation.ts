export const checkValidEmail = (email: string) => {
	// Check invalid characters, enough characters, spaces etc.
	if (!email.includes('@' || '.')) return false;
	return true;
};

export const checkValidUsername = (username: string) => {
	// Username must be longer that 6 letters and only contain letters
	if (username.length < 5) return false;
	if (username.length > 16) return false;

	// const letters = /[a-z]/gi;
	// if (!username.match(letters)) return false;

	return true;
};

export const checkValidPassword = (password: string, passwordTwo: string) => {
	if (password !== passwordTwo) return false;
	if (password.length < 8) return false;
	return true;
};

export const checkValidTaskName = (email: string) => {};

export const checkValidTask = (email: string) => {};
