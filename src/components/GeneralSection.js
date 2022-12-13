import ShowItem from './ShowItem'

const GeneralSection = ({ showsData, title, searchText, isHomePage = false, setBookmark }) => {
  const shows = showsData.filter((s) => s.title.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <section className="general-section">
      {!(isHomePage && searchText) && (
        <h1>{!isHomePage && searchText ? `Search results for ${searchText}` : title}</h1>
      )}

      <div className="general-section-items">
        {shows.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={false} setBookmark={setBookmark}/>
        ))}
      </div>
    </section>
  )
}

export default GeneralSection
