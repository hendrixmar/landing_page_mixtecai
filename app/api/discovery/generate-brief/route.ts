import { NextResponse } from 'next/server';
import { callOpenRouter } from '@/lib/openrouter';
import { getDb } from '@/lib/db';
import { briefs } from '@/lib/db/schema';
import type { DiscoveryAnswer, DiscoveryBrief } from '@/types/discovery';
import { v4 as uuid } from 'uuid';

const BRIEF_PROMPT = `Eres un consultor de descubrimiento digital para Artesanos Digitales. Basándote en la conversación de descubrimiento con el cliente, genera un brief de proyecto estructurado.

FORMATO DE RESPUESTA (JSON estricto):
{
  "businessType": "Tipo de negocio del cliente",
  "challenges": "Desafíos principales identificados",
  "goals": "Objetivos del proyecto",
  "scope": "Alcance estimado del proyecto",
  "budget": "Rango de presupuesto estimado o 'Por definir'",
  "timeline": "Timeline estimado o 'Por definir'",
  "summary": "Resumen ejecutivo de 2-3 oraciones describiendo lo que el cliente necesita y la solución recomendada"
}

Responde SIEMPRE en español. Sé específico y profesional.`;

export async function POST(request: Request) {
    try {
        const { answers } = (await request.json()) as { answers: DiscoveryAnswer[] };

        // Extract client name and email from hardcoded questions
        const clientName = String(answers.find((a) => a.questionId === 'q-name')?.answer || 'Sin nombre');
        const clientEmail = String(answers.find((a) => a.questionId === 'q-email')?.answer || 'Sin email');

        // Build context
        const answersContext = answers
            .map((a) => `Pregunta: ${a.questionText}\nRespuesta: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
            .join('\n\n');

        const response = await callOpenRouter([
            { role: 'system', content: BRIEF_PROMPT },
            {
                role: 'user',
                content: `Genera un brief de proyecto basado en esta conversación de descubrimiento:\n\n${answersContext}`,
            },
        ]);

        // Parse AI response
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        const briefId = uuid();
        const now = new Date();

        // Store in database
        await getDb().insert(briefs).values({
            id: briefId,
            clientName,
            clientEmail,
            businessType: parsed.businessType || '',
            challenges: parsed.challenges || '',
            goals: parsed.goals || '',
            scope: parsed.scope || '',
            budget: parsed.budget || '',
            timeline: parsed.timeline || '',
            summary: parsed.summary || '',
            rawAnswers: JSON.stringify(answers),
            createdAt: now,
        });

        const brief: DiscoveryBrief = {
            id: briefId,
            clientName,
            clientEmail,
            businessType: parsed.businessType || '',
            challenges: parsed.challenges || '',
            goals: parsed.goals || '',
            scope: parsed.scope || '',
            budget: parsed.budget || '',
            timeline: parsed.timeline || '',
            summary: parsed.summary || '',
            rawAnswers: answers,
            createdAt: now.toISOString(),
        };

        return NextResponse.json({ brief });
    } catch (error) {
        console.error('Discovery generate-brief error:', error);
        return NextResponse.json(
            { error: 'Error generando el brief del proyecto' },
            { status: 500 }
        );
    }
}
