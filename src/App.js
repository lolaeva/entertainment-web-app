import showsData from './data.json'
import ShowItem from './components/ShowItem'

function App() {
  console.log('data', showsData)
  return (
    <div className="App">
      <section className="general-section">
        {showsData.map((show) => (
          <ShowItem key={show.title} show={show} isTrendingPage={false} />
        ))}
      </section>
    </div>
  )
}

export default App
