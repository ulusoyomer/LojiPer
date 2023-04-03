const setCookies = (res, token) => {
	res.cookie('lojiper_token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
	});
};

export default setCookies;
