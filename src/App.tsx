import { useState } from 'react';
import { useHashRoute } from '@/lib/router';
import { detectCountryCode } from '@/lib/detectCountry';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { LandingPage } from '@/sections/LandingPage';
import { CountryPage } from '@/pages/CountryPage';

function App() {
  const route = useHashRoute();
  // Pre-selected from the visitor's locale/timezone; changeable from the
  // navbar (atlys.com-style flag button) and the hero dropdown alike.
  const [nationality, setNationality] = useState(() => detectCountryCode());

  return (
    <div className="min-h-screen bg-white">
      <Navbar nationality={nationality} onNationalityChange={setNationality} />
      <main>
        {route.page === 'country' ? (
          <CountryPage code={route.code} />
        ) : (
          <LandingPage nationality={nationality} onNationalityChange={setNationality} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
