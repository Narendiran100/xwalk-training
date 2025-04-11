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
}
