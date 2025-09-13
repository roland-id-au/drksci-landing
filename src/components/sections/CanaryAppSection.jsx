import React from 'react';

const CanaryAppSection = () => {
  return (
    <section id="canary-app" className="relative min-h-screen flex flex-col justify-center py-20">
      <div className="mb-8">
        {/* HARMONIZED: Section heading */}
        <h2 className="text-3xl font-light text-gray-400 tracking-wider mb-4 px-4 sm:px-8">VISION: CANARY APP</h2>
      </div>
      
      <div className="max-w-4xl px-4 sm:px-8 mt-8">
        {/* Intro Text */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            What if every abandoned mine hazard was managed through the proper risk framework? Industry operators and staff identify hazards with GPS precision, AMLP staff assess priority levels with photo evidence, and control measures are implemented with full regulatory compliance—all starting with a field report.
          </p>
        </div>

        {/* Info Panel - moved back below intro text */}
        <div className="mb-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex">
          <div className="bg-blue-500/20 p-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="p-4 flex-1">
            {/* HARMONIZED: Info panel text */}
            <p className="text-sm text-blue-300 font-normal mb-2">
              Digital hazard intelligence for Queensland's abandoned mine program.
            </p>
            <p className="text-sm text-blue-300">
              This concept transforms reactive site management into proactive risk assessment through field-tested mobile technology and unified stakeholder coordination.
            </p>
          </div>
        </div>

        {/* Workflow */}
        <div id="workflow" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Workflow</h3>
          <p className="text-lg leading-relaxed mb-8 text-gray-300">
            Field reporting application for hazard identification and risk assessment:
          </p>
          
          {/* 3 Main App Screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Step 1: Check */}
            <div className="text-center">
              <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-4 mb-6">
                {/* HARMONIZED: Mockup step heading */}
                <h3 className="text-xl font-normal text-white mb-2">Check</h3>
                <p className="text-gray-300 text-sm">Instant hazard detection and safety status</p>
              </div>
              
              <div className="mockup-phone border-gray-800 mx-auto mockup-hover cursor-pointer shadow-2xl">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <div className="artboard artboard-demo phone-1 bg-emerald-500 relative overflow-hidden rounded-t-[2rem] rounded-b-[2rem] transition-colors duration-1000" style={{ height: '480px', width: '270px' }}>
                    <div className="flex flex-col items-center justify-center px-6 py-8 h-full relative z-10">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-light text-white">No known hazards nearby</h3>
                          <div className="space-y-1">
                            <p className="text-white/80 text-sm">Checked 500m ±20m</p>
                            <p className="text-white/80 text-sm">2 hours ago</p>
                          </div>
                        </div>
                        <div className="pt-8">
                          <button className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium">
                            Report a Hazard
                          </button>
                          <div className="mt-6">
                            <button className="text-white/70 text-xs hover:text-white/90 transition-colors">Get in touch with us</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2: Capture */}
            <div className="text-center">
              <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-4 mb-6">
                {/* HARMONIZED: Mockup step heading */}
                <h3 className="text-xl font-normal text-white mb-2">Capture</h3>
                <p className="text-gray-300 text-sm">GPS-tagged photo evidence collection</p>
              </div>
              
              <div className="mockup-phone border-gray-800 mx-auto mockup-hover cursor-pointer shadow-2xl">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <div className="artboard artboard-demo phone-1 bg-gray-900 relative overflow-hidden rounded-t-[2rem] rounded-b-[2rem]" style={{ height: '480px', width: '270px' }}>
                    <div className="absolute inset-0 rounded-t-[2rem] rounded-b-[2rem] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                      <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="pt-4 px-4 z-20 relative">
                      <div className="text-center">
                        <div className="relative inline-flex items-center bg-black px-8 py-2 rounded-full mb-2">
                          <span className="text-yellow-300 text-lg uppercase font-bold" style={{ fontFamily: 'Impact, Arial Black, sans-serif', textShadow: '3px 3px 0px rgba(0,0,0,1), -2px -2px 0px rgba(0,0,0,1), 2px -2px 0px rgba(0,0,0,1), -2px 2px 0px rgba(0,0,0,1)', letterSpacing: '0.5px' }}>STAY OUT, STAY ALIVE</span>
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg text-yellow-400">☠️</span>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg text-yellow-400">☠️</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col relative z-10 h-full px-4 pb-16">
                      <div className="flex-1 flex items-center justify-center relative"></div>
                      <div className="flex justify-center items-center pb-4 mt-8">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <button className="w-full bg-yellow-500 text-black py-3 rounded-xl text-sm font-medium hover:bg-yellow-400 transition">
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 3: Report */}
            <div className="text-center">
              <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-4 mb-6">
                {/* HARMONIZED: Mockup step heading */}
                <h3 className="text-xl font-normal text-white mb-2">Report</h3>
                <p className="text-gray-300 text-sm">Quick risk assessment for response teams</p>
              </div>
              
              <div className="mockup-phone border-gray-800 mx-auto mockup-hover cursor-pointer shadow-2xl">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <div className="artboard artboard-demo phone-1 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden rounded-t-[2rem] rounded-b-[2rem]" style={{ height: '480px', width: '270px' }}>
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #06b6d4 0%, transparent 70%), radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 70%)' }}></div>
                    </div>
                    <div className="flex flex-col h-full relative z-10 p-4">
                      <div className="mb-4 pt-2">
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div className="bg-cyan-400 h-1 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="form-step flex-1 flex flex-col">
                          <div className="relative flex items-center justify-center mb-4">
                            <button className="absolute left-0 text-white hover:text-gray-300 transition">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                              </svg>
                            </button>
                            <h4 className="text-white text-base font-medium">What did you find?</h4>
                          </div>
                          <div className="flex-1 space-y-3">
                            <button className="group w-full bg-slate-800 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 text-left">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-red-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <ellipse cx="12" cy="12" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
                                  <ellipse cx="12" cy="12" rx="6" ry="3" fill="none"/>
                                  <ellipse cx="12" cy="12" rx="4" ry="2" fill="none"/>
                                  <path d="M8 10l8 4M16 10l-8 4"/>
                                </svg>
                                <span className="font-medium">Hole in the ground</span>
                              </div>
                            </button>
                            <button className="group w-full bg-slate-800 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 text-left">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-green-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path d="M3 20h18"/>
                                  <path d="M5 20c0-8 3-12 7-12s7 4 7 12"/>
                                  <rect x="10" y="8" width="4" height="12" fill="none"/>
                                  <path d="M8 14h8" strokeWidth="1"/>
                                </svg>
                                <span className="font-medium">Mine tunnel or entrance</span>
                              </div>
                            </button>
                            <button className="group w-full bg-slate-800 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 text-left">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-blue-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4"/>
                                  <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.3"/>
                                  <circle cx="16" cy="9" r="1.5" fill="currentColor" opacity="0.3"/>
                                  <circle cx="6" cy="16" r="1.5" fill="currentColor" opacity="0.3"/>
                                  <circle cx="18" cy="15" r="2" fill="currentColor" opacity="0.3"/>
                                  <path d="M12 8v8M8 12h8" strokeWidth="1" opacity="0.5"/>
                                </svg>
                                <span className="font-medium">Contaminated area</span>
                              </div>
                            </button>
                            <button className="group w-full bg-slate-800 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 text-left">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-orange-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path d="M3 20h18"/>
                                  <rect x="6" y="12" width="3" height="8" fill="none"/>
                                  <rect x="10" y="8" width="4" height="12" fill="none"/>
                                  <rect x="15" y="14" width="3" height="6" fill="none"/>
                                  <path d="M7 12l-1-4M12 8l-1-5M16 14l1-3" strokeWidth="1"/>
                                  <circle cx="8" cy="6" r="1" fill="currentColor"/>
                                  <circle cx="12" cy="4" r="1" fill="currentColor"/>
                                  <circle cx="17" cy="10" r="1" fill="currentColor"/>
                                </svg>
                                <span className="font-medium">Dangerous structures</span>
                              </div>
                            </button>
                            <button className="group w-full bg-slate-800 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl text-sm font-medium border border-slate-600 hover:border-cyan-400 transition-all duration-200 text-left">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-purple-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path d="M4 16c2-3 5-5 8-5s6 2 8 5"/>
                                  <path d="M4 12c2-2 5-3 8-3s6 1 8 3"/>
                                  <path d="M4 8c2-1 5-2 8-2s6 1 8 2"/>
                                  <circle cx="6" cy="18" r="1" fill="currentColor"/>
                                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                                  <circle cx="18" cy="18" r="1" fill="currentColor"/>
                                  <path d="M6 18v2M12 18v2M18 18v2" strokeWidth="1"/>
                                </svg>
                                <span className="font-medium">Mine discharge</span>
                              </div>
                            </button>
                          </div>
                          <div className="pt-4">
                            <button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-xl text-sm font-semibold transition shadow-lg opacity-50 cursor-not-allowed" disabled>
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div id="dashboard" className="mb-12">
          {/* HARMONIZED: Subsection label */}
          <h3 className="text-sm font-light mb-12 text-gray-400 tracking-[0.3em] uppercase">Dashboard</h3>
          <p className="text-lg leading-relaxed mb-8 text-gray-300">
            Real-time hazard monitoring and regulatory oversight for Queensland's abandoned mine program staff:
          </p>
          
          <div className="mockup-browser border border-gray-700/40 bg-gradient-to-br from-gray-800/30 to-gray-900/40 shadow-2xl w-full" style={{ height: '580px', maxWidth: 'none', width: '100%' }}>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/40 px-6 py-4 overflow-hidden h-full">
              <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-5 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900/40 rounded-lg p-2 text-center border border-slate-700/30">
                      <div className="text-red-400 text-lg font-light">12</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider">Critical</div>
                    </div>
                    <div className="bg-slate-900/40 rounded-lg p-2 text-center border border-slate-700/30">
                      <div className="text-amber-400 text-lg font-light">24</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider">Pending</div>
                    </div>
                    <div className="bg-slate-900/40 rounded-lg p-2 text-center border border-slate-700/30">
                      <div className="text-emerald-400 text-lg font-light count-animate">143</div>
                      <div className="text-gray-400 text-xs uppercase tracking-wider">Controlled</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-sm font-medium">Active Events</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-400 text-xs">Live Feed</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '380px' }}>
                    <div className="bg-red-900/30 border border-red-600/40 rounded-lg p-3 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <div className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded mt-0.5">P1</div>
                          <div>
                            <div className="text-white text-sm font-medium">#AML-2024-0847</div>
                            <div className="text-red-300 text-xs">Acid Mine Drainage</div>
                            <div className="text-gray-400 text-xs">Mount Morgan • 2 min ago</div>
                          </div>
                        </div>
                        <div className="text-red-400 text-xs live-update">LIVE</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:bg-slate-900/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <div className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded mt-0.5">P1</div>
                          <div>
                            <div className="text-white text-sm">#AML-2024-0846</div>
                            <div className="text-orange-300 text-xs">Shaft Collapse</div>
                            <div className="text-gray-400 text-xs">Irvinebank • 8 min ago</div>
                          </div>
                        </div>
                        <div className="text-orange-400 text-xs">ACTIVE</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:bg-slate-900/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <div className="px-1.5 py-0.5 bg-orange-500 text-white text-xs font-bold rounded mt-0.5">P2</div>
                          <div>
                            <div className="text-white text-sm">#AML-2024-0845</div>
                            <div className="text-yellow-300 text-xs">Water Contamination</div>
                            <div className="text-gray-400 text-xs">Drake • 15 min ago</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 text-xs">PENDING</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:bg-slate-900/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <div className="px-1.5 py-0.5 bg-orange-500 text-white text-xs font-bold rounded mt-0.5">P2</div>
                          <div>
                            <div className="text-white text-sm">#AML-2024-0844</div>
                            <div className="text-yellow-300 text-xs">Subsidence Risk</div>
                            <div className="text-gray-400 text-xs">Herberton • 32 min ago</div>
                          </div>
                        </div>
                        <div className="text-green-400 text-xs">ASSIGNED</div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-3 cursor-pointer hover:bg-slate-900/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <div className="px-1.5 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded mt-0.5">P3</div>
                          <div>
                            <div className="text-white text-sm">#AML-2024-0843</div>
                            <div className="text-blue-300 text-xs">Fence Damage</div>
                            <div className="text-gray-400 text-xs">Charters Towers • 1 hr ago</div>
                          </div>
                        </div>
                        <div className="text-blue-400 text-xs">REVIEW</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-7">
                  <div className="bg-slate-900/50 border border-slate-700/40 rounded-lg h-full overflow-hidden">
                    <div className="bg-slate-800/50 border-b border-slate-700/40 px-4 py-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-white text-sm font-medium whitespace-nowrap">Report #AML-2024-0847</span>
                        <div className="flex items-center space-x-3">
                          <div className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded whitespace-nowrap">P1 CRITICAL</div>
                          <span className="text-gray-400 text-xs whitespace-nowrap">Submitted via Canary App • 2 min ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '480px' }}>
                      <div>
                        <div className="text-gray-400 text-xs font-medium mb-2">PHOTO EVIDENCE</div>
                        <div className="bg-black/50 rounded-lg overflow-hidden" style={{ height: '120px' }}>
                          <div className="relative h-full bg-gradient-to-br from-orange-900/30 to-amber-900/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <svg className="w-8 h-8 text-orange-400 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 2v12h16V6H4m8 3a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1z"/>
                                </svg>
                                <div className="text-orange-300 text-xs">AMD_discharge_IMG_0847.jpg</div>
                                <div className="text-gray-500 text-xs">Orange water discharge visible</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-gray-400 text-xs font-medium mb-2">LOCATION CAPTURED</div>
                          <div className="bg-blue-900/20 border border-blue-600/20 rounded p-2">
                            <div className="text-white text-xs font-medium">Mount Morgan Historic Mine</div>
                            <div className="text-blue-300 text-xs">-23.6453°, 150.3887°</div>
                            <div className="text-gray-400 text-xs mt-1">±5m accuracy</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-xs font-medium mb-2">MAP VIEW</div>
                          <div className="bg-black/30 rounded h-16 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/10">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-gray-400 text-xs font-medium mb-1">HAZARD TYPE</div>
                            <div className="bg-slate-800/30 rounded px-2 py-1.5">
                              <div className="text-white text-xs">Acid Mine Drainage</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs font-medium mb-1">RISK LEVEL</div>
                            <div className="bg-slate-800/30 rounded px-2 py-1.5">
                              <div className="text-red-300 text-xs">Catastrophic</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-400 text-xs font-medium mb-1">DESCRIPTION</div>
                          <div className="bg-slate-800/30 rounded px-2 py-1.5">
                            <div className="text-white text-xs">Visible orange-colored discharge from abandoned shaft entrance</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-gray-400 text-xs font-medium mb-1">pH READING</div>
                            <div className="bg-slate-800/30 rounded px-2 py-1.5">
                              <div className="text-orange-300 text-xs">3.2</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs font-medium mb-1">FLOW RATE</div>
                            <div className="bg-slate-800/30 rounded px-2 py-1.5">
                              <div className="text-yellow-300 text-xs">50 L/min</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs font-medium mb-1">AFFECTED AREA</div>
                            <div className="bg-slate-800/30 rounded px-2 py-1.5">
                              <div className="text-white text-xs">~200m²</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-400 text-xs font-medium mb-1">FIELD NOTES</div>
                          <div className="bg-slate-800/30 rounded px-2 py-1.5">
                            <div className="text-white text-xs leading-relaxed">
                              Discharge entering unnamed creek approximately 20m from shaft. Dead vegetation observed along drainage path. Strong sulfur odor present. Recommend immediate containment measures.
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-gray-400 text-xs font-medium mb-1">REPORTED BY</div>
                          <div className="bg-slate-800/30 rounded px-2 py-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">JM</span>
                                </div>
                                <div>
                                  <div className="text-white text-xs">Jake Martinez</div>
                                  <div className="text-gray-400 text-xs">Environmental Inspector • QLD EPA</div>
                                </div>
                              </div>
                              <div className="text-green-400 text-xs">✓ Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <button className="flex-1 bg-red-600/80 hover:bg-red-600 text-white text-xs py-2 px-3 rounded font-medium">
                          Dispatch Emergency Team
                        </button>
                        <button className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded">
                          Create Work Order
                        </button>
                        <button className="bg-slate-600/80 hover:bg-slate-600 text-white text-xs py-2 px-3 rounded">
                          Export
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CanaryAppSection;