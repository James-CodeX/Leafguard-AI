'use server';

/**
 * @fileOverview This file contains the Genkit flow for recommending treatment and handling advice for plant diseases.
 *
 * - recommendTreatment - A function that accepts a disease name and returns treatment recommendations.
 * - RecommendTreatmentInput - The input type for the recommendTreatment function.
 * - RecommendTreatmentOutput - The return type for the recommendTreatment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTreatmentInputSchema = z.object({
  diseaseName: z.string().describe('The name of the plant disease.'),
});
export type RecommendTreatmentInput = z.infer<typeof RecommendTreatmentInputSchema>;

const RecommendTreatmentOutputSchema = z.object({
  treatmentRecommendations: z
    .string()
    .describe('Detailed advice on how to handle the plant’s infection.'),
});
export type RecommendTreatmentOutput = z.infer<typeof RecommendTreatmentOutputSchema>;

export async function recommendTreatment(input: RecommendTreatmentInput): Promise<RecommendTreatmentOutput> {
  return recommendTreatmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTreatmentPrompt',
  input: {schema: RecommendTreatmentInputSchema},
  output: {schema: RecommendTreatmentOutputSchema},
  prompt: `You are an expert in plant care. A plant has been diagnosed with the following disease: {{{diseaseName}}}.  Recommend treatments and handling advice specific to this disease. Be detailed and specific in your recommendations.`,
});

const recommendTreatmentFlow = ai.defineFlow(
  {
    name: 'recommendTreatmentFlow',
    inputSchema: RecommendTreatmentInputSchema,
    outputSchema: RecommendTreatmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
