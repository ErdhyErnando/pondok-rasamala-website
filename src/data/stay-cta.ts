import type { Locale } from "../lib/i18n";

/** Closing CTA copy for the stay pages. Index pages help people CHOOSE;
 *  detail pages ask about THIS stay ({name} is filled in per page).
 *  Reviewed with the owner before wiring (draft 2026-11-22). */
export type StayCtaKind = "villa" | "glamping" | "campsite" | "aula";

interface CtaCopy {
	title: string;
	body: string;
	message: string;
}
type Bilingual = Record<Locale, CtaCopy>;

export const stayIndexCta: Record<Exclude<StayCtaKind, "aula">, Bilingual> = {
	villa: {
		id: {
			title: "Bingung pilih villa yang pas?",
			body: "Ceritakan jumlah rombongan dan tanggalnya, kami bantu pilihkan villa yang cukup untuk semua.",
			message:
				"Halo Pondok Rasamala, tolong bantu pilihkan villa. Jumlah rombongan: ... Tanggal: ... Terima kasih.",
		},
		en: {
			title: "Not sure which villa fits?",
			body: "Tell us your group size and dates and we'll match you with a villa that fits everyone.",
			message:
				"Hello Pondok Rasamala, please help me choose a villa. Group size: ... Dates: ... Thank you.",
		},
	},
	glamping: {
		id: {
			title: "Tenda mana yang cocok untuk rombongan Anda?",
			body: "Kirim jumlah tamu dan tanggal, kami bantu pilih tenda dan atur api unggun serta sarapan.",
			message:
				"Halo Pondok Rasamala, tolong bantu pilihkan tenda glamping. Jumlah tamu: ... Tanggal: ... Terima kasih.",
		},
		en: {
			title: "Which tent suits your group?",
			body: "Send your guest count and dates and we'll pick a tent and arrange the bonfire and breakfast.",
			message:
				"Hello Pondok Rasamala, please help me choose a glamping tent. Guests: ... Dates: ... Thank you.",
		},
	},
	campsite: {
		id: {
			title: "Siap berkemah akhir pekan ini?",
			body: "Tanya lot yang masih kosong, tenda dan makan pagi sudah kami siapkan.",
			message:
				"Halo Pondok Rasamala, saya mau tanya lot campsite yang masih kosong. Jumlah orang: ... Tanggal: ... Terima kasih.",
		},
		en: {
			title: "Ready to camp this weekend?",
			body: "Ask which lots are free. Tents and breakfast are already taken care of.",
			message:
				"Hello Pondok Rasamala, which campsite lots are free? Guests: ... Dates: ... Thank you.",
		},
	},
};

export function stayDetailCta(kind: StayCtaKind, name: string, locale: Locale): CtaCopy {
	if (kind === "aula") {
		return locale === "en"
			? {
					title: "Planning an event in the hall?",
					body: "Tell us the event type, headcount and date and we'll arrange the hall, meals and lodging.",
					message:
						"Hello Pondok Rasamala, I'd like to plan an event in the hall. Event: ... Headcount: ... Date: ... Thank you.",
				}
			: {
					title: "Mau pakai aula untuk acara Anda?",
					body: "Ceritakan jenis acara, jumlah peserta, dan tanggal, kami bantu atur aula, konsumsi, dan penginapan.",
					message:
						"Halo Pondok Rasamala, saya mau pakai aula untuk acara. Acara: ... Jumlah peserta: ... Tanggal: ... Terima kasih.",
				};
	}
	return locale === "en"
		? {
				title: `Interested in staying at ${name}?`,
				body: "Send your check-in date and guest count and we'll check availability and reply on WhatsApp.",
				message: `Hello Pondok Rasamala, I'm interested in staying at ${name}. Check-in: ... Guests: ... Thank you.`,
			}
		: {
				title: `Tertarik menginap di ${name}?`,
				body: "Kirim tanggal check-in dan jumlah tamu, kami cek ketersediaannya dan balas lewat WhatsApp.",
				message: `Halo Pondok Rasamala, saya tertarik menginap di ${name}. Check-in: ... Jumlah tamu: ... Terima kasih.`,
			};
}
