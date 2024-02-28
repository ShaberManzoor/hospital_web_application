import './app.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Routers from './routes/Routers'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  )
}

export default App
