import { NextResponse } from 'next/server';
import { callOpenRouter } from '@/lib/openrouter';
import type { DiscoveryAnswer, DiscoveryQuestion } from '@/types/discovery';
import { v4 as uuid } from 'uuid';

const HARDCODED_QUESTIONS: DiscoveryQuestion[] = [
    {
        id: 'q-name',
        text: '¿Cuál es tu nombre?',
        type: 'text',
        placeholder: 'Tu nombre completo',
        aiGenerated: false,
    },
    {
        id: 'q-email',
        text: '¿Cuál es tu correo electrónico?',
        type: 'text',
        placeholder: 'tucorreo@ejemplo.com',
        aiGenerated: false,
    },
    {
        id: 'q-business',
        text: '¿Qué tipo de negocio tienes?',
        type: 'select',
        options: [
            'Restaurante / Alimentos',
            'Tienda / Comercio',
            'Clínica / Salud',
            'Transporte / Logística',
            'Servicios Profesionales',
            'Educación',
            'Inmobiliaria',
            'Otro',
        ],
        aiGenerated: false,
    },
    {
        id: 'q-challenge',
        text: '¿Cuál es tu mayor desafío digital ahora mismo?',
        type: 'textarea',
        placeholder: 'Describe brevemente tu reto principal...',
        aiGenerated: false,
    },
];

const MAX_QUESTIONS = 10;

const SYSTEM_PROMPT = `Eres un consultor de descubrimiento digital para Artesanos Digitales, una agencia de desarrollo de software ubicada en Huajuapan de León, Oaxaca, México. Tu trabajo es hacer preguntas inteligentes para entender las necesidades del cliente potencial.

REGLAS:
- Responde SIEMPRE en español
- Haz UNA sola pregunta por turno — devuelve SOLO la pregunta, sin explicaciones, saludos ni comentarios adicionales
- Adapta cada pregunta al contexto específico del negocio del cliente
- Profundiza en el dominio específico del cliente basándote en sus respuestas anteriores
- Las preguntas deben ayudar a entender: alcance del proyecto, presupuesto aproximado, timeline, objetivos de negocio, y desafíos técnicos
- Sé conversacional y profesional, como un consultor experimentado
- NUNCA menciones que eres una IA, un modelo de lenguaje, o cualquier tecnología de inteligencia artificial

TIPO DE INPUT — elige el más adecuado para cada pregunta:
- "text": para respuestas cortas (nombres, cifras, datos concretos)
- "textarea": para respuestas que necesiten descripción o explicación (retos, objetivos, contexto)
- "select": para elegir entre opciones predefinidas (categorías, rangos, sí/no)

FORMATO DE RESPUESTA (JSON estricto):
{
  "question": "El texto de la pregunta",
  "type": "text" | "textarea" | "select",
  "options": ["opción1", "opción2", "opción3"], // solo si type es "select"
  "placeholder": "texto de placeholder" // solo si type es "text" o "textarea"
}

Si consideras que ya tienes suficiente información (después de 6-8 preguntas en total), responde:
{ "complete": true }`;

export async function POST(request: Request) {
    try {
        const { answers } = (await request.json()) as { answers: DiscoveryAnswer[] };
        const step = answers.length;

        // Return hardcoded questions for the first 4 steps
        if (step < HARDCODED_QUESTIONS.length) {
            return NextResponse.json({ question: HARDCODED_QUESTIONS[step] });
        }

        // Force completion after max questions
        if (step >= MAX_QUESTIONS) {
            return NextResponse.json({ complete: true });
        }

        // Build context from answers
        const answersContext = answers
            .map((a) => `Pregunta: ${a.questionText}\nRespuesta: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
            .join('\n\n');

        const response = await callOpenRouter([
            { role: 'system', content: SYSTEM_PROMPT },
            {
                role: 'user',
                content: `Estas son las respuestas del cliente hasta ahora:\n\n${answersContext}\n\nGenera la siguiente pregunta más relevante. Llevamos ${step} preguntas de un máximo de ${MAX_QUESTIONS}.`,
            },
        ]);

        // Parse the AI response
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        if (parsed.complete) {
            return NextResponse.json({ complete: true });
        }

        const question: DiscoveryQuestion = {
            id: `q-ai-${uuid().slice(0, 8)}`,
            text: parsed.question,
            type: parsed.type || 'text',
            options: parsed.options,
            placeholder: parsed.placeholder,
            aiGenerated: true,
        };

        return NextResponse.json({ question });
    } catch (error) {
        console.error('Discovery next-question error:', error);
        return NextResponse.json(
            { error: 'Error generando la siguiente pregunta' },
            { status: 500 }
        );
    }
}
