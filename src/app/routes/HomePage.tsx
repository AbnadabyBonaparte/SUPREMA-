// src/pages/HomePage.tsx
import React from 'react';
import MatrixHub from '../../../components/MatrixHub';
import SponsoredHero from '../../../components/SponsoredHero';
import TrendSpotlight from '../../../components/TrendSpotlight';
import { ProfessionalType, Trend } from '@/types/ai';

interface HomePageProps {
    onProfessionalSelect: (professional: ProfessionalType) => void;
    onTrendSelect: (trend: Trend) => void;
}

export function HomePage({ onProfessionalSelect, onTrendSelect }: HomePageProps) {
    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section with Sponsored Content */}
            <SponsoredHero />

            {/* Trending Styles Spotlight */}
            <TrendSpotlight onSelectTrend={onTrendSelect} />

            {/* Main Matrix Hub - 18 AI Agents */}
            <MatrixHub onSelect={onProfessionalSelect} onSelectTrend={onTrendSelect} />
        </div>
    );
}

export default HomePage;
