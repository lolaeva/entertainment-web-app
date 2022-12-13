import ShowItem from './ShowItem'

const TrendingSection = ({ showsData, searchText, setBookmark }) => {
  const shows = showsData.filter((s) => s.title.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <section className="trending-section">
      <h1>{searchText ? `Search results for ${searchText}` : 'Trending'}</h1>
      <div className="trending-scroll-section">
        {shows.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={true} setBookmark={setBookmark}/>
        ))}
      </div>
    </section>
  )
}
export default TrendingSection
