// src/ai/flows/detect-plant-disease.ts
'use server';

/**
 * @fileOverview Detects plant diseases from an image and provides a diagnosis.
 *
 * - detectPlantDisease - A function that handles the plant disease detection process.
 * - DetectPlantDiseaseInput - The input type for the detectPlantDisease function.
 * - DetectPlantDiseaseOutput - The return type for the detectPlantDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPlantDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectPlantDiseaseInput = z.infer<typeof DetectPlantDiseaseInputSchema>;

const DetectPlantDiseaseOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the plant disease.'),
  treatment: z.string().describe('The recommended treatment for the plant disease.'),
});
export type DetectPlantDiseaseOutput = z.infer<typeof DetectPlantDiseaseOutputSchema>;

export async function detectPlantDisease(input: DetectPlantDiseaseInput): Promise<DetectPlantDiseaseOutput> {
  return detectPlantDiseaseFlow(input);
}

const detectPlantDiseasePrompt = ai.definePrompt({
  name: 'detectPlantDiseasePrompt',
  input: {schema: DetectPlantDiseaseInputSchema},
  output: {schema: DetectPlantDiseaseOutputSchema},
  prompt: `You are an expert in plant pathology. Analyze the image of the plant and provide a diagnosis of any potential diseases or infections. Also, provide detailed advice on how to handle the plant’s infection.

  Image: {{media url=photoDataUri}}
  `,
});

const detectPlantDiseaseFlow = ai.defineFlow(
  {
    name: 'detectPlantDiseaseFlow',
    inputSchema: DetectPlantDiseaseInputSchema,
    outputSchema: DetectPlantDiseaseOutputSchema,
  },
  async input => {
    const {output} = await detectPlantDiseasePrompt(input);
    return output!;
  }
);
