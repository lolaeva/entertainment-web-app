import showsData from './data.json'
import ShowItem from './components/ShowItem'

function App() {
  console.log(showsData)
  const trendingShows = showsData.filter((show) => show.isTrending)
  const generalShows = showsData.filter((show) => !show.isTrending)
  const bookmarkedShows = showsData.filter((show) => show.isBookmarked)
  const movies = showsData.filter((show) => show.category === 'Movie')
  const tvSeries = showsData.filter((show) => show.category === 'TV Series')

  return (
    <div className="App">
      <section className="trending-section">
        <div className="trending-scroll-section">
          {trendingShows.map((show) => (
            <ShowItem key={show.title} show={show} isTrendingPage={true} />
          ))}
        </div>
      </section>
      <section className="general-section">
        {generalShows.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={false} />
        ))}
      </section>
    </div>
  )
}

export default App
