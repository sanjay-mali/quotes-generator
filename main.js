const category = document.getElementById('category');
const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category.value}`;
const apiKey = 'kczDiu7OFBqCigNtQ6/bPA==6RrfhDVlf0TZvAuw';

async function fetchQuote() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        return { quote: 'Failed to fetch a quote. Please try again later.' };
    }
}

const getQuoteButton = document.querySelector('#generate');
getQuoteButton.addEventListener('click', () => {
    fetchQuote()
        .then(responseData => {
            console.log('API Response:', responseData);

            const quote = document.getElementById('quote-text');
            quote.textContent = ` " ${responseData[0].quote}" `;

            const author = document.getElementById('author');
            author.textContent = `-${responseData[0].author}`;

        })


        .catch(error => {
            console.error('Error:', error);

        });
});

const tweet = document.getElementById('tweet');
tweet.addEventListener('click', () => {
    const quote = document.getElementById('quote-text');
    const author = document.getElementById('author');
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} ${author.textContent}`;
    window.open(tweetUrl, '_blank');
})