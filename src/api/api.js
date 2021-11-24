export const getQuotes = async (pageNum) => {
	const res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes/?page=${pageNum}`);
	const quote = await res.json();
	return quote.data;
}

// export const getQuoteAuthors = async () => {
// 	const res = await fetch('https://quote-garden.herokuapp.com/api/v3/authors');
// 	const author = await res.json();
// 	return author.data;
// }

export const getQuoteAuthors = async (author) => {
	const res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes/?author=${author}`);
	const quotes = await res.json();
	return quotes.data;
}