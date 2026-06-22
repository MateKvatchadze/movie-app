export async function heroLogoPath(movieId) {
  const response = await fetch(`/api/movie-images?id=${movieId}`);
  const data = await response.json();

  const englishLogo = data.logos?.find((logo) => logo.iso_639_1 === "en");
  const firstLogo = data.logos?.[0];

  return englishLogo?.file_path || firstLogo?.file_path ||"";
}