const stopwords = [
	"a",
	"an",
	"the",
	"and",
	"but",
	"or",
	"for",
	"nor",
	"on",
	"at",
	"to",
	"from",
	"by",
	"in",
	"of",
];

export const removeStopwords = (words) => {
	return words.filter((word) => !stopwords.includes(word));
};
