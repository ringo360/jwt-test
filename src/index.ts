import { Hono } from 'hono';
import { decode, sign, verify } from 'hono/jwt';
const app = new Hono();

const secret = 'kairu8264';

app.post('/register', async (c) => {
	try {
		const body = await c.req.parseBody();
		const { user, password } = body;
		const payload = {
			user: user as string,
			pass: password as string,
		};
		const token = await sign(payload, secret);
		return c.json({
			status: 'registered',
			token: token,
		});
	} catch (e) {
		console.log(e);
		return c.json(
			{
				status: 'error',
				info: `${e}`,
			},
			500
		);
	}
});

app.get('/check', async (c) => {
	const body = await c.req.parseBody();
	const { token } = body;
	const result = await verify(token as string, secret);
	return c.json({
		result: result,
	});
});

app.notFound((c) => {
	return c.text('Are you lost?', 404);
});

export default app;
