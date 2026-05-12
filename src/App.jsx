import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsSection from './components/StatsSection'
import SolutionsSection from './components/SolutionsSection'
import ProductsSection from './components/ProductsSection'
import ProjectSection from './components/ProjectSection'
import ClientsSection from './components/ClientsSection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'
import ProductsPage from './pages/ProductsPage'
import SolutionsPage from './pages/SolutionsPage'
import IntroductionPage from './pages/IntroductionPage'
import HistoryPage from './pages/HistoryPage'
import BusinessRecordPage from './pages/BusinessRecordPage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage'

function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        {/* pt-[84px] = header height (py-20px × 2 + logo 44px) — same on all pages */}
        <div className="pt-[84px]">
          <Hero />
          <StatsSection />
          <SolutionsSection />
          <ProductsSection />
          <ProjectSection />
          <ClientsSection />
          <NewsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/company/introduction" element={<IntroductionPage />} />
      <Route path="/company/history" element={<HistoryPage />} />
      <Route path="/company/business-record" element={<BusinessRecordPage />} />
      <Route path="/company/contact" element={<ContactPage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
    </>
  )
}

export default App
