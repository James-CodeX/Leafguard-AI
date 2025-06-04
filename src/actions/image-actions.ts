'use server';

export async function fetchDataUriFromUrl(imageUrl: string): Promise<string> {
  try {
    // Basic validation for common image URL patterns
    if (!imageUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) && !imageUrl.startsWith('http')) {
        // If it doesn't look like an image URL, try to see if it's a data URI already
        if (imageUrl.startsWith('data:image')) {
            return imageUrl; // It's already a data URI
        }
        // throw new Error('Invalid image URL format. Must end with .jpeg, .jpg, .gif, .png, .webp or be a valid data URI.');
    }


    const response = await fetch(imageUrl, {
        headers: {
            'User-Agent': 'LeafGuardAI/1.0 (+https://your-app-domain.com/bot-info)' // Good practice to set a User-Agent
        }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('URL does not point to a valid image. Ensure the URL directly links to an image file.');
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Error fetching image from URL:", error);
    let errorMessage = "Could not load image from URL.";
    if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Invalid URL or network issue. Please check the URL and your connection.";
    }
    throw new Error(errorMessage);
  }
}
