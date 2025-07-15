
export interface WikipediaResult {
  title: string;
  snippet: string;
  url: string;
}

export const wikipediaSearch = async (query: string): Promise<WikipediaResult[]> => {
  try {
    console.log('Searching Wikipedia for:', query);
    
    // Wikipedia API endpoint for search
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
    // Try direct page lookup first
    try {
      const directResponse = await fetch(searchUrl);
      if (directResponse.ok) {
        const data = await directResponse.json();
        return [{
          title: data.title,
          snippet: data.extract || 'No description available.',
          url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`
        }];
      }
    } catch (error) {
      console.log('Direct lookup failed, trying search:', error);
    }

    // Fall back to search API
    const searchApiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&origin=*`;
    
    const response = await fetch(searchApiUrl);
    if (!response.ok) {
      throw new Error('Wikipedia search failed');
    }

    const data = await response.json();
    const searchResults = data.query?.search || [];

    return searchResults.map((result: any) => ({
      title: result.title,
      snippet: result.snippet.replace(/<[^>]*>/g, ''), // Remove HTML tags
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`
    }));
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return [];
  }
};
