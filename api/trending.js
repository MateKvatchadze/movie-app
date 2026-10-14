
export async function GET() {
    const pageOneUrl = "https://api.themoviedb.org/3/trending/all/day?page=1";
    const pageTwoUrl = "https://api.themoviedb.org/3/trending/all/day?page=2";
    const pageThreeUrl = "https://api.themoviedb.org/3/trending/all/day?page=3";
   
   
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

    const mediaResults = allResults.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
    
    const uniqueResults = mediaResults.filter((item, index, array) => {
      return index === array.findIndex(
        (result) => 
          result.id === item.id && 
          result.media_type === item.media_type
      );
    });

    return Response.json({
        results: uniqueResults,
    });
}