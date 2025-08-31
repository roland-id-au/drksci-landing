const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// SVG Definitions content (gradients and filter only)
const svgDefsContent = `
            <!-- Linear gradient for the main colored slash (for BLACK background) -->
            <linearGradient id="rgb-stripe-logo" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="66%" style="stop-color:#00BFFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (for BLACK background) -->
            <linearGradient id="red-trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ff0000;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#ff0000;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00ff00;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#00ff00;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00BFFF;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:0.1" />
            </linearGradient>

            <!-- Linear gradient for the main colored slash (for WHITE background - vibrant) -->
            <linearGradient id="rgb-stripe-logo-white" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="66%" style="stop-color:#00BFFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (for WHITE background - more subtle) -->
            <linearGradient id="red-trail-gradient-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ff0000;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#ff0000;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00ff00;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#00ff00;stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00BFFF;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:0.1" />
            </linearGradient>

            <!-- VAPOURWAVE 1 COLOR DEFINITIONS -->
            <!-- Linear gradient for the main colored slash (Vapourwave 1 on BLACK background) -->
            <linearGradient id="rgb-stripe-logo-vaporwave1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:1" /> <!-- Neon Pink -->
                <stop offset="33%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(0,255,255);stop-opacity:1" /> <!-- Cyan -->
                <stop offset="66%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(100,0,255);stop-opacity:1" /> <!-- Electric Purple -->
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (Vapourwave 1 on BLACK background) -->
            <linearGradient id="red-trail-gradient-vaporwave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(255,0,255);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient-vaporwave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,255,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(0,255,255);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient-vaporwave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(100,0,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:0.1" />
            </linearGradient>

            <!-- Linear gradient for the main colored slash (Vapourwave 1 on WHITE background) -->
            <linearGradient id="rgb-stripe-logo-vaporwave1-white" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(100,0,255);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (Vapourwave 1 on WHITE background) -->
            <linearGradient id="red-trail-gradient-vaporwave1-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(255,0,255);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient-vaporwave1-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,255,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(0,255,255);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient-vaporwave1-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(100,0,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:0.1" />
            </linearGradient>

            <!-- VAPOURWAVE 2 COLOR DEFINITIONS -->
            <!-- Linear gradient for the main colored slash (Vapourwave 2 on BLACK background) -->
            <linearGradient id="rgb-stripe-logo-vaporwave2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(0,0,255);stop-opacity:1" /> <!-- Bright Blue -->
                <stop offset="33%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(255,105,180);stop-opacity:1" /> <!-- Hot Pink -->
                <stop offset="66%" style="stop-color:rgb(255,105,180);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(255,255,0);stop-opacity:1" /> <!-- Electric Yellow -->
                <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (Vapourwave 2 on BLACK background) -->
            <linearGradient id="red-trail-gradient-vaporwave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,0,255);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient-vaporwave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,105,180);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(255,105,180);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient-vaporwave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:0.1" />
            </linearGradient>

            <!-- Linear gradient for the main colored slash (Vapourwave 2 on WHITE background) -->
            <linearGradient id="rgb-stripe-logo-vaporwave2-white" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(0,0,200);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(0,0,200);stop-opacity:1" />
                <stop offset="33%" style="stop-color:rgb(200,80,140);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(200,80,140);stop-opacity:1" />
                <stop offset="66%" style="stop-color:rgb(200,200,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(200,200,0);stop-opacity:1" />
            </linearGradient>

            <!-- Gradients for the fading sections of the trails (Vapourwave 2 on WHITE background) -->
            <linearGradient id="red-trail-gradient-vaporwave2-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,0,200);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(0,0,200);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="green-trail-gradient-vaporwave2-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(200,80,140);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(200,80,140);stop-opacity:0.1" />
            </linearGradient>
            <linearGradient id="blue-trail-gradient-vaporwave2-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(200,200,0);stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:rgb(200,200,0);stop-opacity:0.1" />
            </linearGradient>

            <!-- Grayscale filter for general use -->
            <filter id="grayscale">
                <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/>
            </filter>
            <!-- Avatar slash gradient for general use (if not overridden by vaporwave) -->
            <linearGradient id="avatar-slash-gradient-color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:1" />
            </linearGradient>
             <!-- Avatar slash gradient for general use on white background -->
            <linearGradient id="avatar-slash-gradient-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:1" />
            </linearGradient>
             <!-- Avatar slash gradient for vaporwave 1 on black background -->
            <linearGradient id="avatar-slash-gradient-vaporwave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:1" />
            </linearGradient>
             <!-- Avatar slash gradient for vaporwave 1 on white background -->
            <linearGradient id="avatar-slash-gradient-vaporwave1-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(255,0,255);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(100,0,255);stop-opacity:1" />
            </linearGradient>
             <!-- Avatar slash gradient for vaporwave 2 on black background -->
            <linearGradient id="avatar-slash-gradient-vaporwave2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(255,105,180);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            </linearGradient>
             <!-- Avatar slash gradient for vaporwave 2 on white background -->
            <linearGradient id="avatar-slash-gradient-vaporwave2-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgb(0,0,200);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgb(200,80,140);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(200,200,0);stop-opacity:1" />
            </linearGradient>
`;

// getLogoSVG function content (only the content inside <svg>)
function getLogoSVG(isGrayscale = false, backgroundColor = 'black') {
    let textColor = 'white';
    let mainSlashFillId = 'rgb-stripe-logo';
    let initialRedFillColor = '#ff0000';
    let initialGreenFillColor = '#00ff00';
    let initialBlueFillColor = '#00BFFF';
    let fadingRedFillId = 'red-trail-gradient';
    let fadingGreenFillId = 'green-trail-gradient';
    let fadingBlueFillId = 'blue-trail-gradient';
    let initialSegmentOpacity = 0.6;

    if (backgroundColor === 'white') {
        textColor = '#050505';
        mainSlashFillId = 'rgb-stripe-logo-white';
        initialRedFillColor = '#ff0000';
        initialGreenFillColor = '#00ff00';
        initialBlueFillColor = '#00BFFF';
        fadingRedFillId = 'red-trail-gradient-white';
        fadingGreenFillId = 'green-trail-gradient-white';
        fadingBlueFillId = 'blue-trail-gradient-white';
        initialSegmentOpacity = 0.7;
    } else if (backgroundColor === 'vaporwave-black') {
        textColor = 'white';
        mainSlashFillId = 'rgb-stripe-logo-vaporwave1';
        initialRedFillColor = 'rgb(255,0,255)';
        initialGreenFillColor = 'rgb(0,255,255)';
        initialBlueFillColor = 'rgb(100,0,255)';
        fadingRedFillId = 'red-trail-gradient-vaporwave1';
        fadingGreenFillId = 'green-trail-gradient-vaporwave1';
        fadingBlueFillId = 'blue-trail-gradient-vaporwave1';
        initialSegmentOpacity = 0.6;
    } else if (backgroundColor === 'vaporwave-white') {
        textColor = '#050505';
        mainSlashFillId = 'rgb-stripe-logo-vaporwave1-white';
        initialRedFillColor = 'rgb(255,0,255)';
        initialGreenFillColor = 'rgb(0,255,255)';
        initialBlueFillColor = 'rgb(100,0,255)';
        fadingRedFillId = 'red-trail-gradient-vaporwave1-white';
        fadingGreenFillId = 'green-trail-gradient-vaporwave1-white';
        fadingBlueFillId = 'blue-trail-gradient-vaporwave1-white';
        initialSegmentOpacity = 0.7;
    } else if (backgroundColor === 'vaporwave2-black') {
        textColor = 'white';
        mainSlashFillId = 'rgb-stripe-logo-vaporwave2';
        initialRedFillColor = 'rgb(0,0,255)';
        initialGreenFillColor = 'rgb(255,105,180)';
        initialBlueFillColor = 'rgb(255,255,0)';
        fadingRedFillId = 'red-trail-gradient-vaporwave2';
        fadingGreenFillId = 'green-trail-gradient-vaporwave2';
        fadingBlueFillId = 'blue-trail-gradient-vaporwave2';
        initialSegmentOpacity = 0.6;
    } else if (backgroundColor === 'vaporwave2-white') {
        textColor = '#050505';
        mainSlashFillId = 'rgb-stripe-logo-vaporwave2-white';
        initialRedFillColor = 'rgb(0,0,200)';
        initialGreenFillColor = 'rgb(200,80,140)';
        initialBlueFillColor = 'rgb(200,200,0)';
        fadingRedFillId = 'red-trail-gradient-vaporwave2-white';
        fadingGreenFillId = 'green-trail-gradient-vaporwave2-white';
        fadingBlueFillId = 'blue-trail-gradient-vaporwave2-white';
        initialSegmentOpacity = 0.7;
    }

    const mainSlashFill = `url(#${mainSlashFillId})`;
    const fadingRedFill = `url(#${fadingRedFillId})`;
    const fadingGreenFill = `url(#${fadingGreenFillId})`;
    const fadingBlueFill = `url(#${fadingBlueFillId})`;

    return `
            <!-- Contiguous Angled Color Trail Segments -->
            <g class="color-trail-group">
                <!-- Initial BRIGHTER segments (solid color, starts slanted, ends vertically at x=30) -->
                <path d="M 30 9 L 27.67 14.33 L 30 14.33 L 30 9 Z" fill="${initialRedFillColor}" opacity="${initialSegmentOpacity}"/>
                <path d="M 27.67 14.33 L 25.34 19.66 L 30 19.66 L 30 14.33 Z" fill="${initialGreenFillColor}" opacity="${initialSegmentOpacity}"/>
                <path d="M 25.34 19.66 L 23 25 L 30 25 L 30 19.66 Z" fill="${initialBlueFillColor}" opacity="${initialSegmentOpacity}"/>

                <!-- FADING segments (gradient fill, follows slash slant) -->
                <path d="M 30 9 L 30 14.33 L 52.67 14.33 L 55 9 Z" fill="${fadingRedFill}"/>
                <path d="M 30 14.33 L 30 19.66 L 52.67 19.66 L 55 14.33 Z" fill="${fadingGreenFill}"/>
                <path d="M 30 19.66 L 30 25 L 52.67 25 L 55 19.66 Z" fill="${fadingBlueFill}"/>
            </g>

            <!-- The 'd' text part of the logo -->
            <text x="2" y="25" font-family="'Exo 2', sans-serif" font-size="28" font-weight="700" fill="${textColor}">d</text>
            
            <!-- The 'rksci' text part of the logo -->
            <text x="34" y="25" font-family="'Exo 2', sans-serif" font-size="28" font-weight="700" fill="${textColor}">rksci</text>

            <!-- The main colored slash graphic, placed last to ensure it's on top of trails -->
            <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="${mainSlashFill}" />
    `;
}

// getAvatarSVG function content (only the content inside <svg>)
function getAvatarSVG(isGrayscale = false, backgroundColor = 'black') {
    let mainSlashFillId = 'avatar-slash-gradient-color'; 
    
    if (backgroundColor === 'white') {
        mainSlashFillId = 'avatar-slash-gradient-white'; 
    } else if (backgroundColor === 'vaporwave-black') {
        mainSlashFillId = 'avatar-slash-gradient-vaporwave1';
    } else if (backgroundColor === 'vaporwave-white') {
        mainSlashFillId = 'avatar-slash-gradient-vaporwave1-white';
    } else if (backgroundColor === 'vaporwave2-black') {
        mainSlashFillId = 'avatar-slash-gradient-vaporwave2';
    } else if (backgroundColor === 'vaporwave2-white') {
        mainSlashFillId = 'avatar-slash-gradient-vaporwave2-white';
    }

    const mainSlashFill = `url(#${mainSlashFillId})`;

    return `
            <!-- The main colored slash graphic -->
            <path d="M23 25 L 18 25 L 25 9 L 30 9 Z" fill="${mainSlashFill}" />
    `;
}


async function generateAllLogos() {
    const outputDir = 'public/logos';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const variations = [
        { func: getLogoSVG, isGrayscale: false, background: 'black', name: 'logo-main', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'black', name: 'logo-main-grayscale', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: false, background: 'white', name: 'logo-main-white', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'white', name: 'logo-main-grayscale-white', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: false, background: 'vaporwave-black', name: 'logo-vaporwave1', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'vaporwave-black', name: 'logo-vaporwave1-grayscale', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: false, background: 'vaporwave-white', name: 'logo-vaporwave1-white', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'vaporwave-white', name: 'logo-vaporwave1-grayscale-white', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: false, background: 'vaporwave2-black', name: 'logo-vaporwave2', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'vaporwave2-black', name: 'logo-vaporwave2-grayscale', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: false, background: 'vaporwave2-white', name: 'logo-vaporwave2-white', viewBox: '0 0 180 30' },
        { func: getLogoSVG, isGrayscale: true, background: 'vaporwave2-white', name: 'logo-vaporwave2-grayscale-white', viewBox: '0 0 180 30' },

        { func: getAvatarSVG, isGrayscale: false, background: 'black', name: 'logo-slash', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'black', name: 'logo-slash-grayscale', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: false, background: 'white', name: 'logo-slash-white', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'white', name: 'logo-slash-grayscale-white', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: false, background: 'vaporwave-black', name: 'logo-slash-vaporwave1', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'vaporwave-black', name: 'logo-slash-vaporwave1-grayscale', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: false, background: 'vaporwave-white', name: 'logo-slash-vaporwave1-white', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'vaporwave-white', name: 'logo-slash-vaporwave1-grayscale-white', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: false, background: 'vaporwave2-black', name: 'logo-slash-vaporwave2', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'vaporwave2-black', name: 'logo-slash-vaporwave2-grayscale', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: false, background: 'vaporwave2-white', name: 'logo-slash-vaporwave2-white', viewBox: '15 5 20 20' },
        { func: getAvatarSVG, isGrayscale: true, background: 'vaporwave2-white', name: 'logo-slash-vaporwave2-grayscale-white', viewBox: '15 5 20 20' },
    ];

    for (const variation of variations) {
        const filterAttr = variation.isGrayscale ? ' filter="url(#grayscale)"' : '';
        const fullSvgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg viewBox="${variation.viewBox}" xmlns="http://www.w3.org/2000/svg" class="responsive-logo"${filterAttr}>
                <defs>
                    ${svgDefsContent}
                </defs>
                ${variation.func(variation.isGrayscale, variation.background)}
            </svg>`;

        const svgFilename = path.join(outputDir, `${variation.name}.svg`);
        const pngFilename = path.join(outputDir, `${variation.name}.png`);

        try {
            fs.writeFileSync(svgFilename, fullSvgContent.trim());
            console.log(`Generated SVG: ${svgFilename}`);

            let rsvgCommandBase = `rsvg-convert ${svgFilename} -o`;
            if (variation.name.startsWith('logo-main')) {
                execSync(`${rsvgCommandBase} ${pngFilename} -w 2048`);
                console.log(`Generated PNG: ${pngFilename}`);
                execSync(`${rsvgCommandBase} ${path.join(outputDir, `${variation.name}@2x.png`)} -w 1024`);
                execSync(`${rsvgCommandBase} ${path.join(outputDir, `${variation.name}@4x.png`)} -w 512`);
            } else {
                execSync(`${rsvgCommandBase} ${pngFilename} -w 2048 -h 2048`);
                console.log(`Generated PNG: ${pngFilename}`);
                execSync(`${rsvgCommandBase} ${path.join(outputDir, `${variation.name}@2x.png`)} -w 1024 -h 1024`);
                execSync(`${rsvgCommandBase} ${path.join(outputDir, `${variation.name}@4x.png`)} -w 512 -h 512`);
            }
            console.log(`Generated high-resolution PNGs for ${variation.name}`);

        } catch (error) {
            console.error(`Error generating ${variation.name}:`, error);
        }
    }

    console.log('All logo generation complete!');
}

generateAllLogos();
