import React, { useRef, useEffect, useState, useCallback } from 'react';
import DetailLayout from './components/DetailLayout';

export default function MapgyverDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRefs = useRef({});

  const initVisualization = () => {
    console.log('Initializing 3D visualization...');
    
    if (typeof window.THREE === 'undefined') {
      console.error('THREE is not defined');
      return;
    }
    
    const THREE = window.THREE;
    console.log('THREE.js version:', THREE.REVISION);
    
    // Global variables  
    let scene, camera, renderer;
    let fpvScene, fpvCamera, fpvRenderer;
    let terrainMesh;
    let marker;
    let trailLines = [];
    let trailPoints = [];
    let currentTrailIndex = 0;
    let lastTrailUpdate = 0;
    let pathStartTime = Date.now();
    let fpvDirectionalLight = null;
    let fpvRimLight = null;
    let currentWalkPosition = null;
    let currentWalkDirection = null;
    let currentWalkerPosition = null;
    let fpvCameraTarget = null;
    let fpvCameraPosition = null;

    const container = document.getElementById('terrain-container');
    const fpvContainer = document.getElementById('fpv-container');
    const loadingScreen = document.getElementById('loading-screen');

    if (!container || !fpvContainer) {
      console.error('Required containers not found!', { container, fpvContainer });
      if (loadingScreen) {
        loadingScreen.innerHTML = '<div style="color: red; font-family: monospace; text-align: center;">Containers not found<br/>Retrying in 2s...</div>';
        setTimeout(initVisualization, 2000);
      }
      return;
    }
    
    console.log('Containers found:', { 
      container: container.offsetWidth + 'x' + container.offsetHeight, 
      fpvContainer: fpvContainer.offsetWidth + 'x' + fpvContainer.offsetHeight 
    });

    try {
      // Main scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      
      // Position camera for good wireframe view
      camera.position.set(0, 15, 20);
      camera.lookAt(0, 0, 0);
      
      // FPV scene setup
      fpvScene = new THREE.Scene();
      fpvCamera = new THREE.PerspectiveCamera(75, fpvContainer.clientWidth / fpvContainer.clientHeight, 0.1, 1000);
      fpvRenderer = new THREE.WebGLRenderer({ antialias: true });
      
      fpvRenderer.setSize(fpvContainer.clientWidth, fpvContainer.clientHeight);
      fpvRenderer.setClearColor(0x000000, 1);
      fpvContainer.appendChild(fpvRenderer.domElement);
      
      // Create yellow marker (like original)
      const markerGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 8);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,  // Bright highlighter yellow
        transparent: true,
        opacity: 0.8
      });
      marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.visible = false;
      scene.add(marker);
      
      // Create terrain
      createProceduralTerrain();
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      scene.add(directionalLight);
      
      // Basic ambient light for T2 style
      const fpvAmbientLight = new THREE.AmbientLight(0xff0000, 1.0);
      fpvScene.add(fpvAmbientLight);
      
      // Add fog for depth and contrast
      fpvScene.fog = new THREE.FogExp2(0x000000, 0.05); // Black fog for contrast
      
      // Initialize infinite walk - force first step generation
      pathStartTime = Date.now() - 2100; // Trigger immediate first step
      
      // Setup camera controls
      setupControls();
      
      // Initialize path animation to start immediately
      pathStartTime = Date.now() - 600; // Start slightly in the past to trigger immediately
      
      // Start animation loop
      animate();
      
      // Hide loading screen
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      
    } catch (error) {
      console.error('Error creating Three.js scene:', error);
    }
    
    function createProceduralTerrain() {
      const geometry = new THREE.PlaneGeometry(20, 20, 30, 30); // Reduced complexity
      geometry.rotateX(-Math.PI / 2);
      
      // Add realistic height variations
      const vertices = geometry.attributes.position.array;
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const z = vertices[i + 2];
        
        // Base terrain using sine waves
        let height = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 2;
        
        // Add smaller detail layers
        height += Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.8;
        height += Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.4;
        
        // Add some random variation for realism
        height += (Math.random() - 0.5) * 0.5;
        
        vertices[i + 1] = height;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Create height-based vertex colors - Blue to Magenta gradient
      const positions = geometry.attributes.position.array;
      const colors = new Float32Array(positions.length);
      let minY = Infinity, maxY = -Infinity;
      
      // Find height range
      for (let i = 1; i < positions.length; i += 3) {
        minY = Math.min(minY, positions[i]);
        maxY = Math.max(maxY, positions[i]);
      }
      
      const heightRange = maxY - minY;
      if (heightRange === 0) {
        minY -= 0.5;
        maxY += 0.5;
      }
      
      // Blue (0x0000ff) to Magenta (0xff00ff) gradient
      for (let i = 0; i < positions.length; i += 3) {
        const height = positions[i + 1];
        const normalizedHeight = Math.max(0, Math.min(1, (height - minY) / (maxY - minY)));
        
        // Blue (0x0000ff) to Magenta (0xff00ff) gradient
        const blue = { r: 0, g: 0, b: 1 };
        const magenta = { r: 1, g: 0, b: 1 };
        
        colors[i] = blue.r + (magenta.r - blue.r) * normalizedHeight;
        colors[i + 1] = blue.g + (magenta.g - blue.g) * normalizedHeight;
        colors[i + 2] = blue.b + (magenta.b - blue.b) * normalizedHeight;
      }
      
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const wireframeMaterial = new THREE.MeshBasicMaterial({ 
        vertexColors: true,
        wireframe: true, 
        transparent: true, 
        opacity: 0.8 
      });
      
      // Create invisible surface for raycasting
      const surfaceMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
      });
      
      // Create visible wireframe
      terrainMesh = new THREE.Mesh(geometry.clone(), surfaceMaterial);
      scene.add(terrainMesh);
      
      // Add wireframe overlay  
      const wireframeGeometry = geometry.clone();
      const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      scene.add(wireframeMesh);
      
      // Setup FPV terrain
      addTerrainToFPV(geometry);
      
      console.log('Enhanced procedural terrain created with', geometry.attributes.position.count, 'vertices');
    }
    
    function addTerrainToFPV(geometry) {
      // Add terrain to FPV scene - Terminator 2 red vision 
      const fpvTerrainGeometry = geometry.clone();
      fpvTerrainGeometry.computeVertexNormals();
      
      const fpvTerrainMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xaa0000,  // Brighter red surface fill
        wireframe: false,
        transparent: true,
        opacity: 0.6
      });
      const fpvTerrainMesh = new THREE.Mesh(fpvTerrainGeometry, fpvTerrainMaterial);
      fpvTerrainMesh.name = 'fpvTerrain';
      fpvScene.add(fpvTerrainMesh);
      
      // Bright T2-style wireframe
      const fpvWireframeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3333,  // Bright red wireframe
        wireframe: true,
        transparent: true,
        opacity: 1.0
      });
      const fpvWireframeMesh = new THREE.Mesh(fpvTerrainGeometry, fpvWireframeMaterial);
      fpvWireframeMesh.name = 'fpvWireframe';
      fpvScene.add(fpvWireframeMesh);
    }
    
    function generateNextPathStep() {
      // Generate next step in infinite randomized walk
      if (trailPoints.length === 0 || !currentWalkPosition) {
        // Initialize at random starting position
        currentWalkPosition = new THREE.Vector3(
          (Math.random() - 0.5) * 8, // Random start within terrain bounds
          0,
          (Math.random() - 0.5) * 8
        );
        // Start with a clear direction
        currentWalkDirection = new THREE.Vector3(
          Math.random() - 0.5,
          0,
          Math.random() - 0.5
        ).normalize();
        currentWalkerPosition = currentWalkPosition.clone();
      }
      
      // Generate next direction with strong momentum (lost person tends to keep going)
      let newDirection;
      
      // 80% chance to continue in roughly the same direction (with slight deviation)
      // 20% chance for a significant direction change (confusion/obstacle)
      if (Math.random() < 0.8) {
        // Continue with slight course correction
        const deviation = 0.3; // Max 30 degree deviation
        newDirection = new THREE.Vector3(
          currentWalkDirection.x + (Math.random() - 0.5) * deviation,
          0,
          currentWalkDirection.z + (Math.random() - 0.5) * deviation
        ).normalize();
      } else {
        // Significant direction change (turning at obstacle or confusion)
        const turnAngle = (Math.random() - 0.5) * Math.PI; // Up to 90 degrees turn
        newDirection = new THREE.Vector3(
          Math.cos(turnAngle) * currentWalkDirection.x - Math.sin(turnAngle) * currentWalkDirection.z,
          0,
          Math.sin(turnAngle) * currentWalkDirection.x + Math.cos(turnAngle) * currentWalkDirection.z
        ).normalize();
      }
      
      // Step size with variation (terrain difficulty simulation)
      const stepSize = 0.12 + Math.random() * 0.08;
      currentWalkPosition.add(newDirection.multiplyScalar(stepSize));
      
      // Wrap around terrain boundaries for infinite walk
      const terrainSize = 10;
      if (Math.abs(currentWalkPosition.x) > terrainSize) {
        currentWalkPosition.x = -Math.sign(currentWalkPosition.x) * terrainSize;
      }
      if (Math.abs(currentWalkPosition.z) > terrainSize) {
        currentWalkPosition.z = -Math.sign(currentWalkPosition.z) * terrainSize;
      }
      
      // Get terrain height at this position
      if (terrainMesh) {
        const raycaster = new THREE.Raycaster();
        raycaster.set(new THREE.Vector3(currentWalkPosition.x, 10, currentWalkPosition.z), new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObject(terrainMesh);
        if (intersects.length > 0) {
          currentWalkPosition.y = intersects[0].point.y + 0.1;
        }
      }
      
      // Store new direction for next step
      currentWalkDirection = newDirection.clone();
      
      return {
        position: currentWalkPosition.clone(),
        direction: newDirection.clone(),
        timestamp: Date.now()
      };
    }
    
    function updateTrailVisualization() {
      const now = Date.now();
      const elapsed = now - pathStartTime;
      
      // Generate new path step every 500ms for continuous human-paced walking
      if (elapsed > 500) {
        const newStep = generateNextPathStep();
        trailPoints.push(newStep);
        
        // Add trail segment
        addTrailPoint(newStep.position);
        
        // Update marker position exactly at walker position
        marker.position.copy(newStep.position);
        marker.position.y += 0.5;
        marker.visible = true;
        
        // Store the exact walker position for FPV sync
        currentWalkerPosition = newStep.position.clone();
        
        // Limit trail length to prevent memory issues and maintain performance
        const maxTrailLength = 50; // Longer trail for continuous movement
        if (trailPoints.length > maxTrailLength) {
          // Remove oldest trail segment from main scene
          const oldestLine = trailLines.shift();
          if (oldestLine && oldestLine.geometry) {
            scene.remove(oldestLine);
          }
          trailPoints.shift();
        }
        
        // Reset timer for next step
        pathStartTime = now;
        
        // Fade older trail segments for visual effect
        trailLines.forEach((line, index) => {
          if (line.material) {
            const age = trailLines.length - index;
            const opacity = Math.max(0.2, 1.0 - (age / maxTrailLength));
            line.material.opacity = opacity;
          }
        });
      }
    }
    
    function addTrailPoint(point) {
      if (trailPoints.length > 1) {
        // Create line from last point to new point
        const lastPoint = trailPoints[trailPoints.length - 2].position;
        
        const lineGeometry = new THREE.BufferGeometry();
        const points = [lastPoint, point];
        lineGeometry.setFromPoints(points);
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ff00, // Bright green trail
          linewidth: 4,
          transparent: true,
          opacity: 0.9
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        trailLines.push(line);
        
        // Add subtle glow effect with tube geometry for better visibility
        const tubeGeometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3([lastPoint, point]),
          2, // segments
          0.03, // radius
          3, // radial segments
          false
        );
        
        const tubeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ff88, 
          transparent: true,
          opacity: 0.4
        });
        
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        scene.add(tube);
        trailLines.push(tube); // Store tube for cleanup
        
      } else if (trailPoints.length === 1) {
        // First point - create a glowing starting marker
        const startGeometry = new THREE.SphereGeometry(0.08, 12, 8);
        const startMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x00ff00,
          transparent: true,
          opacity: 0.8
        });
        const startMarker = new THREE.Mesh(startGeometry, startMaterial);
        startMarker.position.copy(point);
        scene.add(startMarker);
        
        // Add glow ring
        const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 16);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(point);
        ring.rotateX(-Math.PI / 2);
        scene.add(ring);
        
        // Store markers for cleanup
        trailLines.push(startMarker, ring);
      }
    }
    
    function clearTrail() {
      // Remove all trail lines
      trailLines.forEach(line => {
        if (line.geometry) scene.remove(line);
      });
      trailLines = [];
    }
    
    function setupControls() {
      // Automatic camera rotation for better view of the path
      let currentAngle = 0;
      const baseRadius = Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z);
      
      setInterval(() => {
        currentAngle += 0.002; // Even slower rotation
        camera.position.x = Math.sin(currentAngle) * baseRadius;
        camera.position.z = Math.cos(currentAngle) * baseRadius;
        camera.lookAt(0, 0, 0);
      }, 100); // Less frequent updates
    }
    
    function updateFPVCamera(targetPoint) {
      // Initialize FPV camera tracking if needed
      if (!fpvCameraPosition) {
        fpvCameraPosition = new THREE.Vector3(targetPoint.x, targetPoint.y + 1.6, targetPoint.z);
        fpvCameraTarget = new THREE.Vector3(targetPoint.x + 1, targetPoint.y + 1.6, targetPoint.z + 1);
      }
      
      // Direct positioning - FPV should be exactly where the walker is
      fpvCameraPosition.set(targetPoint.x, targetPoint.y + 1.6, targetPoint.z);
      fpvCamera.position.copy(fpvCameraPosition);
      
      // Calculate forward look direction based on movement
      if (currentWalkDirection) {
        // Look straight ahead in the direction of movement at eye level
        fpvCameraTarget.set(
          targetPoint.x + currentWalkDirection.x * 8,
          targetPoint.y + 1.6, // Look straight ahead at same height
          targetPoint.z + currentWalkDirection.z * 8
        );
      } else {
        // Default forward look - straight ahead
        fpvCameraTarget.set(
          targetPoint.x + 1, 
          targetPoint.y + 1.6, // Same height for forward look
          targetPoint.z + 1
        );
      }
      
      fpvCamera.lookAt(fpvCameraTarget);
    }
    
    function animate() {
      requestAnimationFrame(animate);
      
      // Update trail visualization
      updateTrailVisualization();
      
      // Ensure FPV camera is always at exact walker position
      if (currentWalkerPosition && fpvCamera) {
        // Update FPV to match current walker position exactly
        fpvCamera.position.set(
          currentWalkerPosition.x,
          currentWalkerPosition.y + 1.6,
          currentWalkerPosition.z
        );
        
        // Add subtle human-like head movement
        const walkBob = Math.sin(Date.now() * 0.003) * 0.02;
        const sway = Math.cos(Date.now() * 0.002) * 0.01;
        fpvCamera.position.y += walkBob;
        fpvCamera.position.x += sway;
        
        // Update look direction
        if (currentWalkDirection && fpvCameraTarget) {
          fpvCameraTarget.set(
            currentWalkerPosition.x + currentWalkDirection.x * 8,
            currentWalkerPosition.y + 1.6,
            currentWalkerPosition.z + currentWalkDirection.z * 8
          );
          fpvCamera.lookAt(fpvCameraTarget);
        }
      }
      
      // Rotate marker
      if (marker.visible) {
        marker.rotation.y += 0.02;
      }
      
      renderer.render(scene, camera);
      fpvRenderer.render(fpvScene, fpvCamera);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300);
    
    // Load Three.js and initialize 3D visualization
    const loadThreeJS = async () => {
      // Check if THREE is already loaded
      if (window.THREE) {
        setTimeout(initVisualization, 500);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js';
      script.onload = () => {
        console.log('Three.js loaded successfully');
        setTimeout(initVisualization, 500);
      };
      script.onerror = () => {
        console.error('Failed to load Three.js');
        // Hide loading screen on error
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.innerHTML = '<div style="color: red; font-family: monospace;">Failed to load 3D visualization</div>';
        }
      };
      document.head.appendChild(script);
    };
    
    loadThreeJS();
  }, []);


  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* CSS for blinking animation */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

      <DetailLayout maxWidth="1000px" backText="Back to Miskatonics">

        {/* Crisis Context */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,0,0,0.05) 0%, rgba(255,255,0,0.05) 100%)',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#ff9800',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>
              Real Crisis, Real Stakes
            </div>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.3'
            }}>
              Celine is Missing (June 2023)
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#bbb',
              maxWidth: '600px',
              margin: '0 auto 1.5rem auto',
              lineHeight: '1.6'
            }}>
              Belgian backpacker disappears in Tasmania's wilderness. Traditional search methods—helicopters, dogs, thermal imaging—fail against ancient terrain. We approach it as engineers, not rescuers.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              '@media (min-width: 768px)': {
                gap: '2rem'
              }
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: '#f44336' }}>GPS</div>
                <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: '#888' }}>Status</div>
                <div style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)', color: '#4caf50', marginTop: '0.25rem', fontWeight: '600' }}>Known</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', fontWeight: '700', color: '#ff9800' }}>
                  {(() => {
                    const june2023 = new Date('2023-06-01');
                    const now = new Date();
                    const weeks = Math.floor((now - june2023) / (1000 * 60 * 60 * 24 * 7));
                    return `${weeks}W`;
                  })()}
                </div>
                <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: '#888' }}>Since 2023</div>
                <div style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)', color: '#666', marginTop: '0.25rem' }}>Ongoing</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', fontWeight: '700', color: '#2196f3' }}>TAS</div>
                <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: '#888' }}>Location</div>
                <div style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)', color: '#666', marginTop: '0.25rem' }}>Wilderness</div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Header */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{
              fontSize: '0.875rem',
              color: '#ff9800',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Computational Rescue
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#4caf50',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Field Tested
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#888',
                fontWeight: '300'
              }}>
                2024
              </div>
            </div>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            color: 'white'
          }}>
            MapGyver: LLM-Based Lost Person Behavior Modeling
          </h1>

          {/* Live Status Panel */}

          <p style={{
            fontSize: '1.25rem',
            color: '#bbb',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Teaching machines to think like the lost. Using large language models to simulate human decision-making under extreme cognitive load, transforming search and rescue from guesswork into computational probability.
          </p>
        </section>

        {/* Field Research Documentation */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            Field Research Documentation
          </h2>
          <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.9rem' }}>
            Direct footage from search terrain reconnaissance. These conditions defeat conventional GPS and visual search methods.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {/* Forest Canopy Image */}
            <div style={{
              position: 'relative',
              background: '#111',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #333'
            }}>
              <img
                src="/videos/forest-canopy.jpg"
                alt="Dense forest canopy - typical lost person terrain"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '1rem',
                color: 'white'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Dense Forest Canopy</div>
                <div style={{ fontSize: '0.7rem', color: '#bbb' }}>GPS signal degradation zone</div>
              </div>
            </div>

            {/* Terrain Reconnaissance Video */}
            <div 
              style={{
                position: 'relative',
                background: '#111',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #333',
                cursor: 'pointer'
              }}
              onMouseEnter={() => {
                const video = videoRefs.current['terrain'];
                if (video) {
                  video.play();
                  setHoveredVideo('terrain');
                }
              }}
              onMouseLeave={() => {
                const video = videoRefs.current['terrain'];
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                  setHoveredVideo(null);
                }
              }}
            >
              <video
                ref={el => videoRefs.current['terrain'] = el}
                src="/videos/terrain-reconnaissance.mp4"
                poster="/videos/terrain-reconnaissance-thumb.jpg"
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              {hoveredVideo !== 'terrain' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid white',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    marginLeft: '3px'
                  }} />
                </div>
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '1rem',
                color: 'white',
                pointerEvents: 'none'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Terrain Reconnaissance</div>
                <div style={{ fontSize: '0.7rem', color: '#bbb' }}>13s field footage</div>
              </div>
            </div>

            {/* Navigation Challenges Video */}
            <div 
              style={{
                position: 'relative',
                background: '#111',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #333',
                cursor: 'pointer'
              }}
              onMouseEnter={() => {
                const video = videoRefs.current['navigation'];
                if (video) {
                  video.play();
                  setHoveredVideo('navigation');
                }
              }}
              onMouseLeave={() => {
                const video = videoRefs.current['navigation'];
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                  setHoveredVideo(null);
                }
              }}
            >
              <video
                ref={el => videoRefs.current['navigation'] = el}
                src="/videos/navigation-challenges.mp4"
                poster="/videos/navigation-challenges-thumb.jpg"
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              {hoveredVideo !== 'navigation' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.7)',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid white',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    marginLeft: '3px'
                  }} />
                </div>
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                padding: '1rem',
                color: 'white',
                pointerEvents: 'none'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Navigation Challenges</div>
                <div style={{ fontSize: '0.7rem', color: '#bbb' }}>5s field footage</div>
              </div>
            </div>
          </div>
          
          <div style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            padding: '1rem',
            fontSize: '0.8rem',
            color: '#999',
            fontFamily: 'monospace'
          }}>
            <strong style={{ color: '#ffeb3b' }}>FIELD CONDITIONS:</strong> Dense canopy blocks satellite signals. Visibility &lt;10m. 
            No clear sightlines for traditional search patterns. Terrain features indistinguishable. 
            These are the conditions where human intuition fails and computational behavioral modeling becomes essential.
          </div>
        </section>

        {/* Chess Experiment */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            The Chess Experiment
          </h2>
          <div style={{ 
            fontSize: '1rem', 
            color: '#ccc', 
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            Being lost is not random. There's a grammar to it, a syntax of decisions that seem irrational from above but make perfect sense at ground level. The question became whether machine learning could decode these patterns. Not just search grids on maps, but the actual decision tree of someone lost.
            <br/><br/>
            We found those patterns in chess. Lost people and chess players share a cognitive arc. Early moves are rational, considered. Middle game brings pressure – time running out, options narrowing. End game is pure pattern recognition through exhaustion. The same degradation curve appears whether you're seeking checkmate or seeking north.
            <br/><br/>
            Two million chess games gave us what ethics wouldn't: precise documentation of human decision-making under pressure. Time-stamped proof of how minds fail predictably. The correlation was mathematical – a three-move blunder at hour four of play mapped to choosing the wrong ridge at dusk.
          </div>
          
          {/* Chess Model Failure */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a, #2d1b1b)',
            border: '1px solid #d32f2f',
            borderRadius: '8px',
            padding: '2rem',
            margin: '2rem 0',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '15px',
              background: '#d32f2f',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              FAILED APPROACH
            </div>
            <div style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#ccc'
            }}>
              <strong style={{ color: '#ff6b6b' }}>The chess model was elegant mathematics applied to messy reality.</strong> A grandmaster sacrifices position for tempo; a lost hiker sacrifices energy for elevation. Both optimizing, both constrained, both racing clocks. Except one plays for points, the other for survival.
              <br/><br/>
              <span style={{ color: '#999' }}>Initial attempt: model lost person decisions as chess moves on terrain grid. 64 squares, optimal paths, game theory. Elegant on paper, useless in practice.</span>
              <br/><br/>
              <strong style={{ color: '#ff6b6b' }}>Field tests revealed the fatal flaw: chess players think in objectives, lost people think in obstacles.</strong>
              <br/><br/>
              <em style={{ color: '#ffeb3b' }}>Lost people don't think like chess players—they think like panicked humans. The lesson was expensive but clear. Being lost isn't a game with rules – it's biology responding to geography.</em>
            </div>
          </div>
        </section>

        {/* Interactive 3D Terrain Visualization */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            Interactive Terrain Visualization
          </h2>
          <div style={{ 
            fontSize: '1rem', 
            color: '#ccc', 
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            We needed something that could actually experience terrain, not just analyze it. The breakthrough came from abandoning chess altogether and embracing what large language models do best: embody personas and make decisions through conversation.
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            margin: '30px 0'
          }}>
            <div id="terrain-container" style={{
              height: '450px',
              position: 'relative',
              backgroundColor: 'transparent'
            }}>
              <div className="loading-screen" id="loading-screen" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 9999
              }}>
                <div className="loading-cursor" style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  width: '10px',
                  height: '20px',
                  backgroundColor: 'black',
                  animation: 'blink 0.7s step-end infinite'
                }}></div>
                <div className="modem-icon" style={{
                  width: '150px',
                  height: '100px',
                  backgroundColor: '#333',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  position: 'relative',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#0f0'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#0f0',
                    borderRadius: '50%',
                    animation: 'blink 1s infinite'
                  }}></div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <div>MODEM v2.0</div>
                    <div style={{ fontSize: '10px' }}>LOADING 3D...</div>
                    <div style={{ fontSize: '8px', color: '#0a0' }}>████████░░ 80%</div>
                  </div>
                </div>
              </div>
            </div>
            <div id="fpv-container" style={{
              height: '450px',
              position: 'relative',
              backgroundColor: '#1a1a1a'
            }}></div>
          </div>
        </section>

        {/* LLM Sense Matrices */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
            LLM Sense Matrices
          </h2>
          <div style={{
            background: '#0a0a0a',
            borderRadius: '8px',
            padding: '2rem',
            border: '1px solid #333'
          }}>
            <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Every lost person operates with three critical information streams: water proximity, visibility, and terrain difficulty. 
              Our LLM agents process these as dynamic matrices, making decisions the way humans do—imperfectly, under pressure.
            </p>
            
            {/* Matrix Grid Visualization */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {/* Water Matrix */}
              <div>
                <h4 style={{ color: '#03a9f4', fontSize: '0.875rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                  💧 WATER PROXIMITY
                </h4>
                <div style={{ 
                  background: '#111', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  lineHeight: '1.2'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
                    {[
                      ['0', '0', '1', '3', '5'],
                      ['0', '1', '2', '4', '6'],
                      ['0', '1', '@', '5', '7'],
                      ['0', '0', '1', '3', '5'],
                      ['0', '0', '0', '1', '2']
                    ].map((row, i) => 
                      row.map((cell, j) => (
                        <div key={`${i}-${j}`} style={{
                          padding: '4px',
                          textAlign: 'center',
                          background: cell === '@' ? '#ffeb3b' : `rgba(3, 169, 244, ${cell * 0.15})`,
                          color: cell === '@' ? '#000' : '#fff',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.6rem', marginTop: '0.5rem' }}>
                    0=no water, 9=stream/river
                  </div>
                </div>
              </div>

              {/* Visibility Matrix */}
              <div>
                <h4 style={{ color: '#8bc34a', fontSize: '0.875rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                  👁 VISIBILITY
                </h4>
                <div style={{ 
                  background: '#111', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  lineHeight: '1.2'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
                    {[
                      ['2', '3', '4', '5', '6'],
                      ['3', '4', '5', '6', '7'],
                      ['4', '5', '@', '7', '8'],
                      ['3', '4', '5', '6', '7'],
                      ['2', '3', '4', '5', '6']
                    ].map((row, i) => 
                      row.map((cell, j) => (
                        <div key={`${i}-${j}`} style={{
                          padding: '4px',
                          textAlign: 'center',
                          background: cell === '@' ? '#ffeb3b' : `rgba(139, 195, 74, ${cell * 0.12})`,
                          color: cell === '@' ? '#000' : '#fff',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.6rem', marginTop: '0.5rem' }}>
                    0=fog/dense trees, 10=clear view
                  </div>
                </div>
              </div>

              {/* Difficulty Matrix */}
              <div>
                <h4 style={{ color: '#ff9800', fontSize: '0.875rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                  🏔 TERRAIN DIFFICULTY
                </h4>
                <div style={{ 
                  background: '#111', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  lineHeight: '1.2'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
                    {[
                      ['8', '7', '6', '4', '3'],
                      ['7', '6', '4', '3', '2'],
                      ['6', '4', '@', '2', '1'],
                      ['4', '3', '2', '1', '0'],
                      ['3', '2', '1', '0', '0']
                    ].map((row, i) => 
                      row.map((cell, j) => (
                        <div key={`${i}-${j}`} style={{
                          padding: '4px',
                          textAlign: 'center',
                          background: cell === '@' ? '#ffeb3b' : cell >= '6' ? '#d32f2f' : cell >= '3' ? '#ff9800' : '#4caf50',
                          color: cell === '@' ? '#000' : '#fff',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.6rem', marginTop: '0.5rem' }}>
                    0=easy trail, 9=cliff/impassable
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lost Person Personas */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
            Lost Person Personas
          </h2>
          <p style={{ color: '#999', marginBottom: '1.5rem' }}>
            Each LLM agent embodies a specific lost person profile with distinct decision-making patterns under stress.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🥵',
                title: 'Experienced Hiker',
                color: '#4caf50',
                prompt: '"You\'ve been hiking for 20 years but took a wrong turn 3 hours ago. Stay calm, follow water downstream. Mark trees with your knife. You have 6 hours of daylight, half a water bottle, and two energy bars. Trust your experience over panic."'
              },
              {
                icon: '👧',
                title: 'Missing Child',
                color: '#ff9800',
                prompt: '"You are 8 years old. You wandered from the campsite chasing a butterfly. Everything looks the same. You\'re scared and crying. Adults always said \'stay put if lost\' but you hear water and you\'re thirsty. Your legs hurt."'
              },
              {
                icon: '🏃',
                title: 'Trail Runner',
                color: '#2196f3',
                prompt: '"You were doing a 10-mile trail run. Took a game trail by mistake. No water, no food, just running gear. You can cover ground fast but you\'re dehydrated. Keep moving or rest? Every minute counts before dark."'
              }
            ].map((persona, i) => (
              <div key={i} style={{
                background: '#111',
                borderRadius: '6px',
                padding: '1.5rem',
                border: `1px solid ${persona.color}33`
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>
                  {persona.icon}
                </div>
                <h4 style={{ 
                  color: persona.color, 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontFamily: 'monospace'
                }}>
                  {persona.title}
                </h4>
                <p style={{ 
                  color: '#999', 
                  fontSize: '0.8rem', 
                  lineHeight: '1.4',
                  fontFamily: 'monospace',
                  fontStyle: 'italic'
                }}>
                  {persona.prompt}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Turn-Based Exploration */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
            Turn-Based Navigation
          </h2>
          <p style={{ color: '#999', marginBottom: '1.5rem' }}>
            Each decision affects energy, visibility, and position. The LLM thinks through choices like a real lost person.
          </p>
          
          <div style={{ background: '#0a0a0a', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
            {/* Turn 1 */}
            <div style={{ 
              background: '#1a1a1a', 
              padding: '1.5rem', 
              borderRadius: '6px', 
              marginBottom: '1rem',
              border: '1px solid #333'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #333'
              }}>
                <h4 style={{ color: '#4caf50', fontSize: '1rem', fontFamily: 'monospace' }}>
                  [TURN 1] Initial scan...
                </h4>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#4caf50' }}>⚡ ENERGY: 90%</span>
                  <span style={{ color: '#ff9800' }}>🕐 TIME: 14:20</span>
                  <span style={{ color: '#03a9f4' }}>💧 HYDRATION: Good</span>
                </div>
              </div>
              <div style={{ color: '#ffeb3b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>THINKING:</div>
              <div style={{ color: '#ccc', marginLeft: '1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                "Water sounds strong to my right. Terrain gets softer that way."
              </div>
              <div style={{ color: '#2196f3', fontWeight: 'bold', fontSize: '0.9rem' }}>
                → ACTION: WALK right
              </div>
            </div>

            {/* Turn 2 */}
            <div style={{ 
              background: '#1a1a1a', 
              padding: '1.5rem', 
              borderRadius: '6px',
              border: '1px solid #333'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #333'
              }}>
                <h4 style={{ color: '#4caf50', fontSize: '1rem', fontFamily: 'monospace' }}>
                  [TURN 2] After moving right...
                </h4>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#ffeb3b' }}>⚡ ENERGY: 75%</span>
                  <span style={{ color: '#ff9800' }}>🕐 TIME: 14:35</span>
                  <span style={{ color: '#03a9f4' }}>💧 HYDRATION: Fair</span>
                </div>
              </div>
              <div style={{ color: '#ffeb3b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>THINKING:</div>
              <div style={{ color: '#ccc', marginLeft: '1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                "Much closer to water now. Ground is wet. Visibility dropping."
              </div>
              <div style={{ color: '#2196f3', fontWeight: 'bold', fontSize: '0.9rem' }}>
                → ACTION: WALK forward
              </div>
            </div>
          </div>
        </section>


        {/* The Solution */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            The Solution: MapGyver
          </h2>
          <div style={{ 
            fontSize: '1rem', 
            color: '#ccc', 
            lineHeight: '1.8'
          }}>
            We needed something that could actually experience terrain, not just analyze it. The breakthrough came from abandoning chess altogether and embracing what large language models do best: embody personas and make decisions through conversation.
            <br/><br/>
            Our approach combines three core innovations: persona-driven LLM simulation, real-time terrain analysis, and turn-based decision modeling. Lost person personas are implemented as system prompts that embody distinct psychological profiles under stress. The simulation runs on a faculty system enabling natural navigation commands: walk, run, yell, rest, sleep—each with realistic energy costs and environmental consequences.
            <br/><br/>
            The technical architecture integrates Model Context Protocol (MCP) for LLM-environment interaction, enabling conversational interfaces between AI agents and detailed terrain models. Agents possess vision, movement, memory, and condition monitoring faculties that mirror human navigation capabilities under cognitive load.
            <br/><br/>
            Terrain data incorporates multiple dimensional matrices: visibility (fog, tree cover), water proximity (psychological comfort factors), and difficulty gradients (cliff faces, impassable terrain). Each agent decision influences probability distributions for subsequent moves, creating dynamic search priority maps.
          </div>
        </section>

        {/* Key Machine Hypothesis */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
            Key Machine Hypotheses
          </h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
            borderRadius: '8px',
            padding: '2rem',
            border: '1px solid #333'
          }}>
            {[
              'Can LLM personas probabilistically predict lost person movement patterns through conversational simulation?',
              'Will ridge-following behaviors emerge spontaneously from terrain analysis without explicit programming?',
              'Do water-seeking decision patterns correlate with documented survival psychology when modeled through personas?',
              'Can cognitive load degradation be captured through conversational turn degradation in extended simulations?',
              'Will real-time LLM decision trees generate actionable search priority maps during active operations?'
            ].map((hypothesis, i) => (
              <div key={i} style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: i < 4 ? '1.5rem' : 0
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ff9800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>?</span>
                </div>
                <div style={{ 
                  fontSize: '1rem', 
                  color: '#ddd', 
                  lineHeight: '1.6',
                  paddingTop: '0.25rem'
                }}>
                  {hypothesis}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Applications */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white' }}>
            Implications & Future Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '6px', border: '1px solid #333' }}>
              <h4 style={{ color: '#ff9800', marginBottom: '1rem' }}>Search & Rescue Revolution</h4>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Fundamental shift from geographic to behavioral search methodologies. Real-time search resource allocation based on computational probability.
              </p>
            </div>
            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '6px', border: '1px solid #333' }}>
              <h4 style={{ color: '#2196f3', marginBottom: '1rem' }}>Autonomous Systems</h4>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Integration possibilities with drone swarms and automated search systems. Multi-agent coordination for large-scale operations.
              </p>
            </div>
            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '6px', border: '1px solid #333' }}>
              <h4 style={{ color: '#9c27b0', marginBottom: '1rem' }}>Beyond Rescue</h4>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Applications in military operations, autonomous navigation, behavioral prediction, and disaster response planning.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ 
          textAlign: 'center', 
          paddingTop: '4rem',
          paddingBottom: '6rem',
          borderTop: '1px solid #333'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Join the Search
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#bbb',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            Our research is free and open. We welcome you to help join the search for better ways to find the lost.
          </p>
          <a 
            href="mailto:contact@drksci.com?subject=MapGyver Research Collaboration"
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'white',
              textDecoration: 'none',
              padding: '1rem 2rem',
              background: 'transparent',
              display: 'inline-block'
            }}
          >
            contact@drksci.com
          </a>
        </section>

      </DetailLayout>
    </>
  );
}