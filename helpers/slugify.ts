export function slugify(text: string): string {
  return text
    .toLowerCase() // convert to lowercase
    .trim() // remove whitespace from both ends
    .normalize("NFD") // normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics (accents)
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple hyphens
}
