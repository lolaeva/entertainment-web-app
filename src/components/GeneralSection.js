import ShowItem from './ShowItem'

const GeneralSection = ({ showsData, title, searchText, isHomePage = false }) => {
  return (
    <section className="general-section">
      {!isHomePage && !searchText && (
        <h1>{!isHomePage && searchText ? `Search results for ${searchText}` : title}</h1>
      )}

      <div className="general-section-items">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={false} />
        ))}
      </div>
    </section>
  )
}

export default GeneralSection
