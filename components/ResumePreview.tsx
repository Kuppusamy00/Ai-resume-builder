import React, { useRef, useState, useLayoutEffect } from 'react';
import type { ResumeData } from '../types';
import { Button } from './common/FormElements';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import TechnicalTemplate from './templates/TechnicalTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import BoldTemplate from './templates/BoldTemplate';
import CompactTemplate from './templates/CompactTemplate';
import SwissTemplate from './templates/SwissTemplate';
import TimelineTemplate from './templates/TimelineTemplate';
import InfographicTemplate from './templates/InfographicTemplate';
import { downloadResumeAsPDF } from '../services/pdfService';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  font: string;
  color: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, font, color }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  useLayoutEffect(() => {
    const calculateScale = () => {
      // On mobile screens, don't scale. The content will flow naturally.
      if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint
        setScale(1);
        return;
      }

      if (previewRef.current && contentRef.current) {
        // On larger screens, calculate scale to fit content within the aspect-ratio container.
        const previewHeight = previewRef.current.clientHeight;
        const contentHeight = contentRef.current.scrollHeight;

        if (contentHeight > previewHeight) {
          setScale(previewHeight / contentHeight);
        } else {
          setScale(1);
        }
      }
    };
    
    calculateScale();

    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);

    // Use ResizeObserver to recalculate on content changes
    const resizeObserver = new ResizeObserver(calculateScale);
    if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
    }

    return () => {
        window.removeEventListener('resize', calculateScale);
        resizeObserver.disconnect();
    };
  }, [resumeData, font, template, color]);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
        await downloadResumeAsPDF(previewRef.current);
    } catch (error) {
        console.error("Failed to download PDF:", error);
        alert("There was an error creating the PDF. Please try again.");
    } finally {
        setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    const props = { ref: contentRef, data: resumeData, color };
    switch (template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'technical':
        return <TechnicalTemplate {...props} />;
      case 'corporate':
        return <CorporateTemplate {...props} />;
      case 'academic':
        return <AcademicTemplate {...props} />;
      case 'elegant':
        return <ElegantTemplate {...props} />;
      case 'bold':
        return <BoldTemplate {...props} />;
      case 'compact':
        return <CompactTemplate {...props} />;
      case 'swiss':
        return <SwissTemplate {...props} />;
      case 'timeline':
        return <TimelineTemplate {...props} />;
      case 'infographic':
        return <InfographicTemplate {...props} />;
      case 'minimalist':
      default:
        return <MinimalistTemplate {...props} />;
    }
  };

  return (
    <div>
      <div 
        ref={previewRef}
        className="w-full bg-white rounded-lg shadow-lg md:aspect-[210/297] md:overflow-hidden"
      >
        <div 
          style={{ 
            fontFamily: font, 
            transform: `scale(${scale})`, 
            transformOrigin: 'top' 
          }}
          className="h-full"
        >
          {renderTemplate()}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
};

export default ResumePreview;