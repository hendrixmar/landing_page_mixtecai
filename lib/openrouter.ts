const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export async function callOpenRouter(
    messages: Message[],
    model = 'google/gemini-2.5-flash'
): Promise<string> {
    const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.SITE_URL || 'https://artesanosdigitales.com',
        },
        body: JSON.stringify({
            model,
            messages,
            temperature: 0.7,
            max_tokens: 1024,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
}
