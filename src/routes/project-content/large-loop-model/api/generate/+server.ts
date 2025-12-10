import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// SvelteKit API route to handle OpenAI API calls
export const POST: RequestHandler = async ({ request, setHeaders }) => {
	// Enable CORS
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

	if (!OPENAI_API_KEY) {
		return json({ error: 'OpenAI API key not configured' }, { status: 500 });
	}

	// Get context and angle from request body
	const body = await request.json();
	const { context, angle } = body || {};

	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-4.1',
				messages: [
					{
						role: 'system',
						content:
							'You are a writer of brief, poetic vignettes about ordinary life. Write like a short story in miniature - capturing a moment, a character, a small scene. Reveal how mundane, repetitive, seemingly meaningless moments can hold subtle acts of ownership, agency, or personal meaning. Never use the words \'absurdity\', \'agency\', \'existential\', or \'meaning\' directly. Show through imagery, action, and observation. Avoid didactic statements. Write in present tense. Be specific and sensory.'
					},
					{
						role: 'user',
						content: `Write a brief vignette (3-4 sentences) set ${context}. Draw inspiration from ${angle}. Capture a mundane, repetitive, or seemingly meaningless moment, then reveal a subtle way someone finds ownership, choice, or personal significance within it. Use concrete details, actions, and imagery. No moral, no question, no explanation - just the moment itself.`
					}
				],
				temperature: 0.9,
				max_tokens: 180,
				frequency_penalty: 0.7,
				presence_penalty: 0.5
			})
		});

		if (!response.ok) {
			const error = await response.json();
			return json(
				{ error: error.error?.message || 'Failed to generate text' },
				{ status: response.status }
			);
		}

		const data = await response.json();
		const generatedText = data.choices[0].message.content.trim();

		return json({ text: generatedText });
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

// Handle preflight OPTIONS request
export const OPTIONS: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	});
	return new Response(null, { status: 200 });
};

