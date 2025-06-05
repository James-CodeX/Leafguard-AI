# LeafGuard AI 🌱

LeafGuard AI is a web application that helps gardeners and plant enthusiasts identify and treat plant diseases using artificial intelligence. Simply upload an image of your plant, and our AI will analyze it to provide a diagnosis and treatment recommendations.

## Features

- **Plant Disease Detection**: Upload images of plants to detect diseases and health issues
- **AI-Powered Analysis**: Utilizes advanced AI models to analyze plant images
- **Treatment Recommendations**: Provides detailed treatment advice for identified plant issues
- **User-Friendly Interface**: Modern, responsive UI with intuitive controls
- **Real-time Results**: Quick analysis with immediate feedback

## Technologies Used

- **Frontend**: Next.js 15, React 18, TailwindCSS
- **UI Components**: Radix UI, shadcn/ui
- **AI Integration**: GenKit AI
- **Animation**: Framer Motion
- **Styling**: TailwindCSS, CSS
- **Form Handling**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/leafguard-ai.git
   cd leafguard-ai
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and add the necessary API keys:
   ```
   GENKIT_API_KEY=your_genkit_api_key
   ```

4. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:9002](http://localhost:9002) in your browser to see the application

## Usage

1. Navigate to the home page
2. Upload an image of your plant using the upload button or drag-and-drop interface
3. Click "Analyze Plant" to process the image
4. View the diagnosis and treatment recommendations provided by the AI

## Project Structure

```
leafguard-ai/
├── src/
│   ├── ai/              # AI integration and flows
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and libraries
│   └── actions/         # Server actions
├── public/              # Static assets
└── ...config files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Plant disease detection powered by GenKit AI
- UI components from shadcn/ui and Radix UI
- Icons from Lucide React

---

© LeafGuard AI - Your personal plant health assistant.
