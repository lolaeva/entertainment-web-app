import showsData from './data.json'

function App() {
  console.log('data', showsData)
  return (
    <div className="App">
      {showsData.map((show) => (
        <div key={show.title}>{show.title}</div>
      ))}
    </div>
  )
}

export default App
