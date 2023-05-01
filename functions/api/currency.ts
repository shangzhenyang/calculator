interface Env {
	ALLOWED_REF_HOSTS: string;
	CURRENCY_API_KEY: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
	if (request.method !== "GET") {
		return new Response(null, {
			status: 405
		});
	}

	const refHeader = request.headers.get("Referer");
	if (!refHeader) {
		return new Response(null, {
			status: 403
		});
	}

	const refUrl = new URL(refHeader);
	const allowedHosts = env.ALLOWED_REF_HOSTS.split(",");
	if (!allowedHosts.includes(refUrl.host)) {
		return new Response(null, {
			status: 403
		});
	}

	const response = await fetch(
		"http://www.apilayer.net/api/live?access_key=" +
		encodeURIComponent(env.CURRENCY_API_KEY)
	);
	const resHeaders = new Headers(response.headers);
	resHeaders.set("Access-Control-Allow-Origin", refUrl.origin);

	return new Response(response.body, {
		headers: resHeaders,
		status: response.status,
		statusText: response.statusText
	});
};
