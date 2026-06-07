
export async function GET() {
    const pageOneUrl = "https://api.themoviedb.org/3/trending/movie/day?page=1";
    const pageTwoUrl = "https://api.themoviedb.org/3/trending/movie/day?page=2";
    const pageThreeUrl = "https://api.themoviedb.org/3/trending/movie/day?page=3";
   
   
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
    }

    const responseOne = await fetch (pageOneUrl, options);
    const responseTwo = await fetch (pageTwoUrl, options);
    const responseThree = await fetch (pageThreeUrl, options);


    const data1 = await responseOne.json();
    const data2 = await responseTwo.json();
    const data3 = await responseThree.json();

    const allResults = [...data1.results, ...data2.results, ...data3.results];

    const uniqueResults = allResults.filter((movie, index, array) => {
        return index === array.findIndex((item) => item.id === movie.id);
    })

    return Response.json({
        results: uniqueResults,
    });
}