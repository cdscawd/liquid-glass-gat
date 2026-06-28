import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PreviewShowcase } from './preview/PreviewShowcase'
import { Test } from './pages/Test'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<PreviewShowcase />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
