import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './LandingPage';
import Portfolio from './Portfolio';
import Research from './Research';
import RainedCloudDetail from './RainedCloudDetail';
import MapgyverDetail from './MapgyverDetail';
import ProphetDetail from './ProphetDetail';
import KareerDetail from './KareerDetail';
import PrinchesterDetail from './PrinchesterDetail';
import ProjectDetail from './ProjectDetail';
import CollaboratorIndex from './CollaboratorIndex';
import BlakeCollaborator from './BlakeCollaborator';
import BlakeCoverPage from './BlakeCoverPage';
import BlakeCoverLetterPage from './BlakeCoverLetterPage';
import CandidateApplication from './CandidateApplication';
import ShortUrlResolver from './ShortUrlResolver';
import LinkTracker from './LinkTracker';

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
        <Route path="/research" element={<Research />} />
        <Route path="/miskatonics" element={<Research />} />
        <Route path="/research/mapgyver-lost-person-modeling" element={<MapgyverDetail />} />
        <Route path="/research/prophet-experiment" element={<ProphetDetail />} />
        <Route path="/research/princhester-associates" element={<PrinchesterDetail />} />
        <Route path="/research/sideplot-ai-ideation" element={<ProjectDetail />} />
        <Route path="/miskatonics/mapgyver-lost-person-modeling" element={<MapgyverDetail />} />
        <Route path="/miskatonics/prophet-experiment" element={<ProphetDetail />} />
        <Route path="/miskatonics/princhester-associates" element={<PrinchesterDetail />} />
        <Route path="/miskatonics/sideplot-ai-ideation" element={<ProjectDetail />} />
        {/* Short URL patterns */}
        <Route path="/c" element={<CollaboratorIndex />} />
        <Route path="/c/blake" element={<BlakeCollaborator />} />
        <Route path="/c/blake/cover" element={<BlakeCoverPage />} />
        <Route path="/c/blake/letter/:letterName" element={<BlakeCoverLetterPage />} />
        <Route path="/j/:shortId" element={<CandidateApplication />} />
        <Route path="/candidate/:candidate/:jobSlug" element={<CandidateApplication />} />
        
        {/* Legacy URL pattern aliases for backwards compatibility */}
        <Route path="/collaborator" element={<CollaboratorIndex />} />
        <Route path="/collaborator/blake" element={<BlakeCollaborator />} />
        <Route path="/collaborator/blake/cover" element={<BlakeCoverPage />} />
        <Route path="/c/:collaborator/j/*" element={<CandidateApplication />} />
        <Route path="/collaborator/:collaborator/job/*" element={<CandidateApplication />} />
        <Route path="/a/:shortCode" element={<ShortUrlResolver />} />
        <Route path="/go" element={<LinkTracker />} />
      </Routes>
    </Router>
  );
}

export default App;