import { SITE } from "./constants";

/** Pre-filled WhatsApp link. Every CTA on the site uses this — no bare wa.me links. */
export function waLink(message: string): string {
	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waInquiry = (unit: string) =>
	waLink(
		`Halo Pondok Rasamala, saya mau tanya ketersediaan ${unit} untuk tanggal ..., ... orang. Terima kasih.`,
	);

export const waInquiryEn = (unit: string) =>
	waLink(
		`Hello Pondok Rasamala, I'd like to ask about availability at ${unit} for ..., ... guests. Thank you.`,
	);

export const waGeneral = () =>
	waLink("Halo Pondok Rasamala, saya mau bertanya. Terima kasih.");
