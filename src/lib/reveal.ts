/** CSS-only scroll reveals. Add class="reveal" to any element.
 *  Disabled entirely under prefers-reduced-motion (handled in CSS). */
export function initReveals(root: ParentNode = document): void {
	const els = root.querySelectorAll(".reveal:not([data-reveal-init])");
	if (!("IntersectionObserver" in window)) {
		els.forEach((el) => el.classList.add("is-visible"));
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					e.target.classList.add("is-visible");
					io.unobserve(e.target);
				}
			}
		},
		{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
	);
	els.forEach((el) => {
		el.setAttribute("data-reveal-init", "");
		io.observe(el);
	});
}
