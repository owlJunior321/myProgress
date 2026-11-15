const STAR_EMPTY = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">  <path d="M0 0h24v24H0z" fill="none"/>  <path fill="#FFFF00" d="m12 19.093-5.18 2.282-.423.087-.509-.117-.411-.299-.269-.448-.048-.429.57-5.632-3.772-4.221-.213-.375-.046-.521.157-.483.344-.394.393-.179 5.532-1.198 2.849-4.891.291-.319.481-.204h.508l.481.204.291.319 2.849 4.891 5.533 1.198.393.179.343.394.157.483-.046.52-.213.376-3.772 4.221.57 5.632-.048.429-.269.448-.411.299-.509.117-.423-.087Zm7.621-9.069-4.594-.995c-.356-.117-.44-.178-.661-.481L12 4.487 9.634 8.549c-.221.302-.305.363-.661.48l-4.594.995 3.132 3.505c.219.303.251.403.252.777l-.473 4.677 4.301-1.896c.357-.114.461-.114.818 0l4.301 1.896-.473-4.677c.001-.374.033-.473.252-.777Z"/></svg>`;
const STAR_FULL = `<svg width='24' height='24' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="#FFFF00" d="m15.875 7.17 5.428 1.175.241.077c.807.351.954 1.326.426 1.977l-3.7 4.142.56 5.525v.253c-.084.876-.965 1.317-1.748 1.016L12 19.096l-5.082 2.239c-.782.301-1.664-.14-1.748-1.016l.001-.253.559-5.525-3.7-4.142c-.527-.651-.381-1.626.426-1.977l.241-.077L8.125 7.17l2.795-4.799c.455-.692 1.405-.866 1.996-.224l.164.224Z"/></svg>`;
const STAR_HALF = `<svg width='24' height='24' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path fill="#FFFF00" d="m15.876 7.17 5.427 1.175.241.077c.807.351.954 1.326.427 1.977l-3.701 4.142.56 5.525.001.253c-.084.876-.966 1.317-1.749 1.016L12 19.096l-5.081 2.239c-.836.319-1.717-.191-1.755-1.112l.007-.157.559-5.525-3.7-4.142c-.527-.651-.381-1.626.426-1.977l.241-.077L8.125 7.17l.001-.001 2.794-4.798.165-.224c.591-.642 1.541-.468 1.996.224ZM12 17.026c.274.029.244.008.504.107l4.206 1.853-.463-4.573a1.34 1.34 0 0 1 .312-.959l3.062-3.427-4.492-.973a1.34 1.34 0 0 1-.815-.592L12 4.49Z"/></svg>`;

function rating(n, { size = "1em", max = 5, label = "Як я зрозумів то:" } = {}) {
  const full = Math.floor(n);
  const hasHalf = (n - full) >= 0.5;
  const empty = max - full - (hasHalf ? 1 : 0);

  const wrap = document.createElement("span");
  wrap.style.display = "inline-flex";
  wrap.style.alignItems = "center";
  wrap.style.gap = "8px";

  if (label) {
    const text = document.createElement("span");
    text.textContent = label;
    wrap.appendChild(text);
  }

  const stars = document.createElement("span");
  stars.style.display = "inline-flex";

  const addStar = (markup) => {
    const tmp = document.createElement("span");
    tmp.innerHTML = markup;
    const svg = tmp.firstElementChild;
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    stars.appendChild(svg);
  };

  for (let i = 0; i < full; i++) addStar(STAR_FULL);
  if (hasHalf) addStar(STAR_HALF);
  for (let i = 0; i < empty; i++) addStar(STAR_EMPTY);

  wrap.appendChild(stars);
  return wrap;
}

document.querySelectorAll(".rating").forEach(el => {
  const n = Number(el.dataset.rating);
  const size = el.dataset.size || "1em";
  const label = el.dataset.label ?? "Як я зрозумів то:";
  el.appendChild(rating(n, { size, label }));
});