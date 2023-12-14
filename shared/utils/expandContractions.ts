const contractionMap = {
	"ain't": "am not",
	"aren't": "are not",
	"can't": "cannot",
	// todo: add more contractions
};

// convert contractions to their standard lexicon
export const expandContractions = (text: string) => {
	return text.replace(/(\b\w+'\w+\b)/g, (match) => {
		return contractionMap[match] || match;
	});
};
