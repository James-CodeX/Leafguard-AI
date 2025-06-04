import { config } from 'dotenv';
config();

import '@/ai/flows/detect-plant-disease.ts';
import '@/ai/flows/recommend-treatment.ts';