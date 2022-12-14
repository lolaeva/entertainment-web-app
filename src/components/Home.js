import TrendingSection from "./TrendingSection"
import GeneralSection from "./GeneralSection"

const Home = ({ showsData, searchText, setBookmark }) => {
  const trendingShows = showsData.filter((show) => show.isTrending)
  const generalShows = showsData.filter((show) => !show.isTrending)
  return (
    <>
      <TrendingSection showsData={trendingShows} searchText={searchText} setBookmark={setBookmark}/>
      <GeneralSection
        showsData={generalShows}
        title="Recommended for you"
        searchText={searchText}
        isHomePage={true}
        setBookmark={setBookmark}
      />
    </>
  )
}

export default Home