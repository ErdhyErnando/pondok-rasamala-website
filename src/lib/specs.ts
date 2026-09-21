export interface SpecCounts {
	bedrooms: number | null;
	bathrooms: number | null;
	extraBeds: number;
}

/** Derive bedroom/bathroom counts from the verbatim seed spec string.
 *  The spec stays the source of truth; counts are a build-time projection
 *  (owner decision Day 3). Floor area was removed — not in seed. */
export function parseSpec(spec: string): SpecCounts {
	const bed = spec.match(/(\d+)\s*kmr\s*tidur/i);
	const bath = spec.match(/(\d+)\s*kmd/i);
	const extra = spec.match(/(\d+)\s*ext\.?\s*bed/i);
	return {
		bedrooms: bed ? Number(bed[1]) : null,
		bathrooms: bath ? Number(bath[1]) : null,
		extraBeds: extra ? Number(extra[1]) : 0,
	};
}
