import ShowItem from './ShowItem'

const TrendingSection = ({ showsData, searchText }) => {
  return (
    <section className="trending-section">
      <h1>{searchText ? `Search results for ${searchText}` : 'Trending'}</h1>
      <div className="trending-scroll-section">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={true} />
        ))}
      </div>
    </section>
  )
}
export default TrendingSection
