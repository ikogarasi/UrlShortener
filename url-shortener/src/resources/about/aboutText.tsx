export const ABOUT_TEXT_TITLE = 'Short way is always the best way!';
export const ABOUT_TEXT_DESCRIPTION_1 =
  'The algorithm takes the long URL provided by the user, which represents the original destination or target of the shortened URL.';
export const ABOUT_TEXT_DESCRIPTION_2 =
  'To create a short URL, a unique identifier needs to be generated.';
export const ABOUT_TEXT_DESCRIPTION_3 =
  'Save the identifier and the long URL to database. This action allows the system to redirect the short URL back to the original long URL when accessed.';
export const ABOUT_TEXT_DESCRIPTION_4 =
  'The unique identifier is used to construct the short URL. This typically involves appending the identifier to a base URL or domain specifically dedicated to the URL shortener service. For example, if the base URL is "https://short.com," and the identifier is "abc123," the resulting short URL would be "https://short.com/abc123"';
export const ABOUT_TEXT_DESCRIPTION_5 =
  "When a user accesses the short URL, the algorithm intercepts the request and extracts the unique identifier from the URL. Using this identifier, it retrieves the corresponding long URL from the data structure and redirects the user's browser to the original destination.";
