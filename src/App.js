import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './LandingPage';
import Portfolio from './Portfolio';
import Miskatonics from './Miskatonics';
import RainedCloudDetail from './RainedCloudDetail';
import MapgyverDetail from './MapgyverDetail';
import ProphetDetail from './ProphetDetail';
import KareerDetail from './KareerDetail';
import PrinchesterDetail from './PrinchesterDetail';
import CollaboratorIndex from './CollaboratorIndex';
import BlakeCollaborator from './BlakeCollaborator';
import BlakeCoverPage from './BlakeCoverPage';
import CandidateApplication from './CandidateApplication';
import ShortUrlResolver from './ShortUrlResolver';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/meg" element={<LandingPage showEmilyModal={true} />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/rained-cloud" element={<RainedCloudDetail />} />
        <Route path="/portfolio/kareer" element={<KareerDetail />} />
        <Route path="/research" element={<Miskatonics />} />
        <Route path="/miskatonics" element={<Miskatonics />} />
        <Route path="/research/mapgyver-lost-person-modeling" element={<MapgyverDetail />} />
        <Route path="/research/prophet-experiment" element={<ProphetDetail />} />
        <Route path="/research/princhester-associates" element={<PrinchesterDetail />} />
        <Route path="/miskatonics/mapgyver-lost-person-modeling" element={<MapgyverDetail />} />
        <Route path="/miskatonics/prophet-experiment" element={<ProphetDetail />} />
        <Route path="/miskatonics/princhester-associates" element={<PrinchesterDetail />} />
        {/* Short URL patterns */}
        <Route path="/c" element={<CollaboratorIndex />} />
        <Route path="/c/blake" element={<BlakeCollaborator />} />
        <Route path="/c/blake/cover" element={<BlakeCoverPage />} />
        <Route path="/j/:shortId" element={<CandidateApplication />} />
        <Route path="/candidate/:candidate/:jobSlug" element={<CandidateApplication />} />
        
        {/* Legacy URL pattern aliases for backwards compatibility */}
        <Route path="/collaborator" element={<CollaboratorIndex />} />
        <Route path="/collaborator/blake" element={<BlakeCollaborator />} />
        <Route path="/collaborator/blake/cover" element={<BlakeCoverPage />} />
        <Route path="/c/:collaborator/j/*" element={<CandidateApplication />} />
        <Route path="/collaborator/:collaborator/job/*" element={<CandidateApplication />} />
        <Route path="/a/:shortCode" element={<ShortUrlResolver />} />
      </Routes>
    </Router>
  );
}

export default App;