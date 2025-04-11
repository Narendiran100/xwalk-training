import { fetchPlaceholders } from "../../scripts/aem.js";
export default async function decorate(block) {
  const [quoteWrapper] = block.children;

  const blockquote = document.createElement("blockquote");
  blockquote.textContent = quoteWrapper.textContent.trim();
  quoteWrapper.replaceChildren(blockquote);

  // fetch placeholders from the 'en' folder
  const placeholders = await fetchPlaceholders();
  const { quoteText } = placeholders;
  //block.appendChild(QuoteText);
  const suffix = document.createElement("span");
  suffix.classList.add("quote-suffix");
  suffix.textContent = quoteText;
  block.appendChild(suffix);

  const [, tags] = [...block.children];
  if (tags) {
    fetch("/taxonomy.json?sheet=de").then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          const taxonomy = json.data;

          // Find the title for the respective tag
          const tagText = tags.textContent.trim();
          const tagEntry = taxonomy.find((entry) => entry.tag === tagText);

          // Replace the tags with the translated title
          if (tagEntry) {
            tags.textContent = tagEntry.title;
          } else {
            console.warn(`No title found for tag: ${tagText}`);
          }
        });
      }
    });
  }
}
